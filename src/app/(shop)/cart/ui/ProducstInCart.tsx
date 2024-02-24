'use client'

import Image from "next/image"
import { ProductImage, QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import { useEffect, useState } from "react"
import Link from "next/link"

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false)
    const { cart:productsInCart,updateProductQuantity,deleteProductInCart } = useCartStore( state => state)

    useEffect(() => {
        setLoaded(true)
    }, []);

    if (!loaded) {
        return <p>Loading...</p>
    }

  return (
    <>
        {
              productsInCart.map( product => (
                <div key={`${product.slug} - ${product.size}`} className="flex">
                  <ProductImage
                    width={100}
                    height={100}
                    alt={product.title}
                    className="mr-5 rounded"
                    src={product.image}
                  />
                  <div>
                    <Link href={`/product/${product.slug}`}>
                        <p className="hover:underline cursor-pointer">{ `${product.title} - ${product.size}` }</p>
                    </Link>
                    <p>${ product.price }</p>
                    <QuantitySelector onQuantityChanged={(quantity) => updateProductQuantity( product, quantity)} quantity={product.quantity}/>
                    <button onClick={() => deleteProductInCart(product)} className="underline mb-3">
                      Remover
                    </button>
                  </div>

                </div>
              ))
            }
    </>
  )
}
