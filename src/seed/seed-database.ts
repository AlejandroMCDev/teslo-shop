import prisma from '../lib/prisma'
import { initialData } from "./seed"



async function main() {

    await Promise.all([
        prisma.orderAdress.deleteMany(),
        prisma.orderItem.deleteMany(),
        prisma.orderItem.deleteMany(),
        prisma.userAddress.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.country.deleteMany(),
        prisma.user.deleteMany(),
        prisma.category.deleteMany(),
    ])

    const { category,products,users,country } = initialData

    await prisma.country.createMany({
        data: country
    })

    await prisma.user.createMany({
        data: users
    })

    const categoriesData: {name: string}[] = category.map( (name) => ({ name }))

    await prisma.category.createMany({
        data: categoriesData
    })

    const categoriesDB = await prisma.category.findMany()
    const categoriesMap = categoriesDB.reduce((map,category) => {

        map[category.name.toLowerCase()] = category.id
        return map
    }, {} as Record<string,string>)


    products.forEach(async(product) => {
        const { type,images,...rest } = product

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type] 
            }
        })

        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })

    })

    console.log('Se ejecuto el seed')
}

(() => {
    if (process.env.NODE_ENV === "production") return
    main()
})()