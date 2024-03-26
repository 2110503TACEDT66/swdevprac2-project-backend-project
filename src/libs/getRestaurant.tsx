export default async function getRestaurant(id:string) {

    // await new Promise((resolve) => {
    //     setTimeout(resolve, 1000)
    // })

    const response = await fetch(`http://localhost:5000/api/v1/restaurants/${id}`)

    if(!response.ok) {
        throw new Error('Failed to fetch hospital')
    }

    return response.json()

}