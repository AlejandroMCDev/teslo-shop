"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesion de usuario",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((product) => product.productId),
      },
    },
  });

  const itemsInOrder = productsId.reduce((count, p) => count + p.quantity, 0);
  const { subTotal, tax, total } = productsId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { total: 0, subTotal: 0, tax: 0 }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      
      const updatedProductsPromises = products.map(async (p) => {
        const productQuantity = productsId
          .filter((product) => product.productId === p.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${p.id},no tiene cantidad definida`);
        }

        return tx.product.update({
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
          where: {
            id: p.id,
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title}`);
        }
      });
      
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productsId.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });
      
      const { country, ...rest } = address;
      
      const orderAddress = await tx.orderAdress.create({
        data: {
          ...rest,
          countryId: address.country,
          orderId: order.id,
        },
      });
      
      return {
        updatedProducts,
        order,
        orderAddress,
      };
    });

    return {
        ok:true,
        order: prismaTx.order,
        prismaTx
    }

  } catch (error: any) {
    
    return {
      ok: false,
      message: error?.message,
    };
  }
};
