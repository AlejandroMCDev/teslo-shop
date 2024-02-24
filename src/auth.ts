import NextAuth, { type Session, type NextAuthConfig, type User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcryptjs from 'bcryptjs'


import { z } from 'zod'


export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {

    async authorized({ auth,request: { nextUrl } }) {

      console.log({auth})

      /* const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      }

      if (isLoggedIn) return Response.redirect( new URL('/dashboard', nextUrl)) */

      return true
    },
    async jwt( { token,user } ) {

      if (user) {
        token.data = user
      }

      return token
    },
    async session({ session, token, user}: {session: Session, token?: JWT, user?:User}) {

      session.user = token?.data as any


      return session
    },
  },
  providers: [
    CredentialsProvider({
        async authorize(credentials, req) {

          console.log('asd')
            // Add logic here to look up the user from the credentials supplied
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials)

            if ( !parsedCredentials.success ) return null

            const { email,password } = parsedCredentials.data

            const user = await prisma.user.findUnique({ where: {email: email.toLowerCase()} })

            if (!user) return null

            if (!bcryptjs.compareSync( password, user.password )) return null

            const { password:_ , ...rest } = user

            console.log(rest)

            return rest

          }
    })
  ],
} satisfies NextAuthConfig);


