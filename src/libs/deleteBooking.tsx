

export default async function deleteBooking(token:string,id:string) {
    const BACKEND_URL= process.env.BACKEND_URL

    const res = await fetch(`${BACKEND_URL}/api/v1/reserves/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
    if(!res.ok) {
        throw new Error('Failed to Delete Booking')
    }

    return await res.json()
}