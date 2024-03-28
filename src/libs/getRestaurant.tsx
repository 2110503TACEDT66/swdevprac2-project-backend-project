import { BACKEND_URL } from "@/config"

export default async function getRestaurant(id:string) {

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/restaurants/${id}`)
        if(!response.ok) {
            throw new Error('Failed to fetch restaurant')
        }

        return response.json()
    } catch (error ) {
        console.error(error);
        throw error;
    }
   

}