'use server'

import prisma from "@/lib/prisma"

export const getStockBySlug = async( slug:string ) => {

    try {

        const stock = await prisma.product.findFirst({
            where: {
                slug
            },
            select: {
                inStock: true
            }
        })

        if (!stock) return null

        const { inStock } = stock

        return inStock


    } catch (error:any) {
        throw new Error(error)
    }
}