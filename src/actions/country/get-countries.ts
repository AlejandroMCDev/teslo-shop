import prisma from "@/lib/prisma"

export const getCountries = async() => {

    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        })
        if (!countries) return []

        return countries

    } catch (error) {
        throw new Error('Error al obtener paises')
    }
}