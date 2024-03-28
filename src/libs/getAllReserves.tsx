import { BACKEND_URL } from "@/config"

export default async function getAllReserves(token:string) {
    try {

        const res = await fetch(`${BACKEND_URL}/api/v1/reserves`, {
            method: 'GET',
            mode:'cors',
            headers: {
                authorization: `Bearer ${token}`,

            }
        })
        if(!res.ok) {
            throw new Error('Cannot get reserves')
        }
        // console.log(BACKEND_URL);
        return await res.json()
    } catch(error)  {
        console.error(error, 'eiei');
        throw error;
    }
    
}