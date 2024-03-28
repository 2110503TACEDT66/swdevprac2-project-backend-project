export default async function getRestaurant(id:string) {


    const response = await fetch(`https://presentation-day-1-backend-project-one.vercel.app/api/v1/restaurants/${id}`)

    if(!response.ok) {
        throw new Error('Failed to fetch restaurant')
    }

    return response.json()

}