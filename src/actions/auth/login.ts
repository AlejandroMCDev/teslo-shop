'use server'

import { signIn } from "@/auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {

    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false
        })

        return 'Sucess'

    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialsSignin'
        }
        return 'Error desconocido'
    }
    
}

export const login = async(email:string,password:string) => {
    try {
        await signIn('credentials', { email, password })
        return {
            ok:true
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo iniciar sesion'
        }
    }
}