export default async function getRestaurants() {
    const BACKEND_URL= process.env.BACKEND_URL


        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    
        const response = await fetch(`${BACKEND_URL}/api/v1/restaurants`)
    
        if(!response.ok) {
            throw new Error('Failed to fetch restaurants')
        }
    
        return response.json()

}