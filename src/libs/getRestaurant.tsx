export default async function getRestaurant(id:string) {
    const BACKEND_URL= process.env.BACKEND_URL


    // await new Promise((resolve) => {
    //     setTimeout(resolve, 1000)
    // })

    const response = await fetch(`${BACKEND_URL}/api/v1/restaurants/${id}`)

    if(!response.ok) {
        throw new Error('Failed to fetch restaurant')
    }

    return response.json()

}