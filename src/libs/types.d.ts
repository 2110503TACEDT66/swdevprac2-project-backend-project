import NextAuth from "next-auth/next";
import User from "@/db/models/User";
import { JWT } from "next-auth/jwt";

declare module 'next-auth' {
    interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string
        }
    }
}

declare module 'next-auth/jwt' {
    type JWT = User;
}