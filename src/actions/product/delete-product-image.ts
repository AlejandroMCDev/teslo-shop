'use server'

import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

cloudinary.config( process.env.CLOUDINARY_URL ?? '' )

export const deleteProductImage = async( imageId:number,imageUrl:string ) => {
    if (!imageUrl.startsWith('http')) return

    const imageName = imageUrl
        .split('/')
        .pop()?.split('.')[0] ?? ''

    try {
        await cloudinary.uploader.destroy(imageName)
        const deletedImage = await prisma.productImage.delete({
            where: {
                id:imageId
            },
            select: {
                product: {
                    select: {
                        slug:true
                    }
                }
            }
        })

        revalidatePath('/admin/products')
        revalidatePath(`/admin/products/${deletedImage.product.slug}`)
        revalidatePath(`/products/${deletedImage.product.slug}`)

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }

}