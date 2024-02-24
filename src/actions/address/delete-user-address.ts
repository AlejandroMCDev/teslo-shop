'use server'

import prisma from "@/lib/prisma"

export const deleteUserAddress = async( userId: string ) => {

    try {
        await prisma.userAddress.delete({
            where: { userId }
        })
        
    } catch (error) {
        throw new Error('No se pudo eliminar la direccion')
    }
}