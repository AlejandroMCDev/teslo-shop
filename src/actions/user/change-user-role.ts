'use server'

import { auth } from "@/auth"
import { Role } from "@/interfaces"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const changeUserRole = async( userId: string, userRol:Role  ) => {

    const session = await auth()
    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    try {
        await prisma.user.update({
            data: {
                role: userRol
            },
            where: { id: userId }
        })

        revalidatePath('/admin/users')

        return {
            ok: true
        }


    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo actualizar el role,revisar el log'
        }
    }

}