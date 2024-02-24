
import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProducstInCart";
import { OrderSummary } from "./ui/OrderSummary";



export default function CartPage() {

  /* if (productsInCart.length === 0) {
    redirect('/empty')
  } */


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      
      <div className="flex flex-col w-[1000px]">
        <Title
          title="Carrito"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
            <div className="flex flex-col mt-5 gap-5">
              <span className="text-xl">Agregar más items</span>
              <Link
                href="/"
                className="underline mb-5"
              >
                Continua comprando
              </Link>
            

            {/* Items */}
            <ProductsInCart/>  
          </div>

          {/* Checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7 h-[300px]">
            <h2 className="text-2xl bg-2">Resumen de orden</h2>

            <OrderSummary/>

            <div className="mt-5 w-full mb-2">
              <Link 
                className="flex btn-primary justify-center"
                href="/checkout/address"
                >
                Checkout
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}