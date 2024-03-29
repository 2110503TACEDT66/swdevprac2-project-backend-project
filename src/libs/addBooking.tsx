import { BACKEND_URL } from "@/config"

export default async function addReserve(startTime:string, endTime:string , id :string , rid:string, tableNumber:string,token:string) {

    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/restaurants/${rid}/reserves/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            mode:'cors',
            body: JSON.stringify({
                start: startTime,
                end: endTime,
                id: id,
                table: tableNumber
            })
        })
        if(!res.ok) {
            throw new Error('Failed to Add Booking')
        }

        return await res.json()
    } catch (error) {
        console.error(error);
        throw error;
    }

    
}