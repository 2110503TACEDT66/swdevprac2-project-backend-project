export default async function getRestaurants() {

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    
        const response = await fetch(`https://presentation-day-1-backend-project-one.vercel.app/api/v1/restaurants`)
    
        if(!response.ok) {
            throw new Error('Failed to fetch restaurants')
        }
    
        return response.json()

}