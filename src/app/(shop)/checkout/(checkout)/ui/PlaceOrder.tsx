"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [isPlacingOrderSending, setIsPlacingOrderSending] = useState(false)

  const router = useRouter()
  const address = useAddressStore((state) => state.address);
  const clearCart = useCartStore((state) => state.clearCart);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore( state => state.cart )

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async() => {
    setIsPlacingOrderSending(true)

    const productsToOrder = cart.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.size
    }))

    const resp = await placeOrder(productsToOrder,address)
    if (!resp.ok) {
      setIsPlacingOrderSending(false)
      setErrorMessage(resp.message)
      return
    }

    clearCart()
    router.replace('/orders/' + resp.order?.id)
  }

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Direccion de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.city}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}

      <hr className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl bg-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 w-full mb-2">
        <p className="mt-5 mb-2 w-full">
          <span className="text-xs">
            {`Al hacer clic en "Colocar orden", aceptas nuestros`}
            <a href="#" className="underline">
              terminos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              politica de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500">{ errorMessage }</p>

        <button onClick={onPlaceOrder} className={
            clsx({
                'btn-primary': !isPlacingOrderSending,
                'btn-disabled': isPlacingOrderSending
            })
        }>
          {/* //href="/orders/123" */}
          Colocar orden
        </button>
      </div>
    </div>
  );
};
