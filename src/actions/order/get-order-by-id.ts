"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const getOrderById = async( id:string ) => {

    const session = await auth()
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    try {
        const order = await prisma.order.findFirst({
            where: { id },
            include: {
                OrderAdress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                slug:true,
                                title: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!order) throw `El id "${ id }" no existe`
        if (session.user.role === 'user') {
            if (session.user.id !== order.userId) {
                throw `${ id } no es de ese usuario`
            }
        }

        return {
            ok: true,
            order
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Hable con el admin'
        }
    }

}