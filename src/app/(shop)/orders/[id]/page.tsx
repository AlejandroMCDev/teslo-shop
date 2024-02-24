import { getOrderById } from "@/actions";
import { OrderStatus, PaypalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5 gap-5">
            <OrderStatus isPaid={order!.isPaid} />

            {/* Items */}
            {order?.OrderItem?.map((product) => (
              <div key={product.product.slug} className="flex">
                <Image
                  width={100}
                  height={100}
                  alt={product.product.title}
                  className="mr-5 rounded"
                  src={`/products/${product.product.ProductImage[0].url}`}
                />
                <div>
                  <p>
                    {product.product.title} - {product.size}
                  </p>
                  <p>
                    ${product.price} x {product.quantity}
                  </p>
                  <p>Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {order?.OrderAdress?.firstName} {order?.OrderAdress?.lastName}
              </p>
              <p>{order?.OrderAdress?.address}</p>
              <p>{order?.OrderAdress?.address2}</p>
              <p>{order?.OrderAdress?.city}</p>
              <p>CP: {order?.OrderAdress?.postalCode}</p>
              <p>{order?.OrderAdress?.phone}</p>
            </div>

            {/* Divider */}

            <hr className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl bg-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder} articulos
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order?.subTotal as number)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">
                {currencyFormat(order?.tax as number)}
              </span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order?.total as number)}
              </span>
            </div>

            <div className="mt-5 w-full mb-2">
              {order?.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PaypalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
