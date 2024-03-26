'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"

interface CredentialFormProps {
    csrfToken?: string
}

export function CredentialForm(props: CredentialFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string|null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const signInRes = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false
        })

        if(signInRes && !signInRes.error) {
            router.push("/")
        } else {
            console.log("Error", signInRes)
            setError("Your Email or Password is Wrong")
        }
    }

    return (
        <form className=""
        onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" name="email" />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" name="password" />
            </div>
            <div>
                <button type="submit" className="bg-white text-black">
                    submit
                </button>
            </div>
        </form>
    )
}