export default async function getRestaurant(id:string) {


    const response = await fetch(`http://localhost:5001/api/v1/restaurants/${id}`)

    if(!response.ok) {
        throw new Error('Failed to fetch restaurant')
    }

    return response.json()

}