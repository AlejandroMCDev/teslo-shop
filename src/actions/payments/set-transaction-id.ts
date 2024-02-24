"use server"

import prisma from "@/lib/prisma"

export const setTransactionId = async( transactionId:string,orderId: string ) => {

    try {
        const order = await prisma.order.update({
            data: {
                transactionId
            },
            where: { id: orderId }
        })

        if (!order) {
            return {
                ok: false,
                message: `La orden con el id ${orderId} no existe`
            }
        }

        return {
            ok:true
        }

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo actulizar el id de la transaccion'
        }
    }

}