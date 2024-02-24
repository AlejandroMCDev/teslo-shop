'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const getPaginatedUsers = async() => {

    const session = await auth()

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de ser un usuario administrador'
        }
    }

    const users = await prisma.user.findMany({
        orderBy: { name: 'desc' }
    })

    if (!users) {
        return {
            ok: false,
            message: 'Algo salio mal'
        }
    }

    return {
        ok: true,
        users
    }

}