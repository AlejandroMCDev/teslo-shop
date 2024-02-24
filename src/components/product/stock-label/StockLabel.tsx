'use client'

import { useEffect, useState } from "react";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"

interface Props {
    slug: string
}

export const StockLabel = ({ slug }:Props) => {

    const [stock, setStock] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    
    useEffect(() => {
        const startGettingStockBySlug = async() => {
            const stock = await getStockBySlug( slug )
            setStock(stock ?? 0)
            setIsLoading(false)
        }
        startGettingStockBySlug()
    }, [slug]);

  return (
    <>
        {
            isLoading ? (
                <h1 className={ `${titleFont.className} antialiased font-bold text-xl bg-gray-200 animate-pulse` }>
                    &nbsp;
                </h1>
            ) : (
                <h1 className={ `${titleFont.className} antialiased font-bold text-xl` }>
                    Stock: { stock }
                </h1>
            )
        }
    </>
  )
}
