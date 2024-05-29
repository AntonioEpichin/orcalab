import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            async authorize() {
                return { id: '1', name: 'Fulano de Tal', email: 'lala@lala.com' };
            },
        }),
    ],
})