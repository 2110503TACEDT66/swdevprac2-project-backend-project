import { BACKEND_URL } from "@/config"


export default async function getUserProfile(token: string) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
            method: 'GET',
            mode:'cors',
            headers: {
                authorization: `Bearer ${token}`,
                mode:'cors'

            }
        })
    
        if(!res.ok) {
            throw new Error('Cannot get user profile')
        }
    
        return await res.json()

    } catch(error) {
        console.error(error);
        throw error;
    }
    
}