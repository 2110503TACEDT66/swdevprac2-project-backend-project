import { BACKEND_URL } from "@/config"


export default async function deleteBooking(token:string,id:string) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/reserves/${id}`, {
            method: 'DELETE',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
                
            }
        })
        if(!res.ok) {
            throw new Error('Failed to Delete Booking')
        }
    
        return await res.json()

    } catch(error) {
        console.error(error);
        throw error;
    }
}