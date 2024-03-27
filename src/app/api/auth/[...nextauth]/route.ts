import User from "@/db/models/User"
import NextAuth from "next-auth/next";
import { Account, AuthOptions, User as nextUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import axios from "axios";
import userSignUp from "@/libs/userSignUp";
import { dbconnect } from "@/db/dbConnect";
import mongoose from "mongoose";

export const authOptions: AuthOptions = {
    providers: [
        // Authentication Providers, use CredentialsProvider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password", placeholder:"password" }
            },
            async authorize(credentials, req) {
              if(!credentials){ return null }
              const user = await userLogin(credentials.email, credentials.password)
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                // console.log(user.json())
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile, tokens) {return({
                id: profile.sub,
                name: `${profile.given_name}`,
                email: profile.email,
                role: profile.role? profile.role:'user'
            })},
          })
          
    ],
    
    session: {strategy:'jwt'},
    callbacks: {
        async signIn({user, account}:{user: nextUser | AdapterUser, account: Account|null}) {
          // const {name, email, password, tel} = user
          console.log("user: ")
          console.log("user: " + user?.email)
          // console.log("account: " + {...account})
          if(account?.provider === 'google') {
            try {
              await dbconnect()
              const db = mongoose.connection.db;
              const usersCollection = db.collection('users');

              const existingUser = await usersCollection.findOne({ email: user.email });
              
              if (!existingUser) {
                console.log('yay')
                const res = await userSignUp(user.email as string, user.name as string, undefined, undefined, true, 'user')
                console.log(res)
              } else if(existingUser) {
                console.log('eiei ii:',existingUser)  
              }
            } catch (error) {
              console.error('Error saving user to MongoDB:', error);
            }
            return true
          }
    
          return true;
        },
        async jwt({token, user}) {
            console.log('JWT Payload:', token);
            console.log('User:', user);
            // if (user &&('role' in user)) {
            //   return {
            //       ...token,
            //       ...user,
            //       role: user.role // Include the role property in the JWT payload
            //   };
            // }
          return {...token, ...user};
        },
        async session({session, token, user}) {
            session.user.role = token.role
            session.user = token as any
            return session
        },
        async redirect({ url, baseUrl }) {
          return baseUrl + "/"; 
        },
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}