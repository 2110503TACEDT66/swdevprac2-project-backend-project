import { BACKEND_URL } from "@/config";

export default async function userLogin(userEmail:string, userPassword:string, provider?:string) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                mode:'cors'

            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword,
                provider: provider
            })
        })
        if(!res.ok) {
            throw new Error('Failed to Login')
        }
    
        return await res.json()

    } catch(error) {
        console.error(error);
        throw error;
    }
}