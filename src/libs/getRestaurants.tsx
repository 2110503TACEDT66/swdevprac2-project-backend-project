import { BACKEND_URL } from "@/config"

export default async function getRestaurants() {
    
    try {

        const response = await fetch(`${BACKEND_URL}/api/v1/restaurants`);
        
        // Check if response is okay
        if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
        }
        
        // Return JSON data
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }

}