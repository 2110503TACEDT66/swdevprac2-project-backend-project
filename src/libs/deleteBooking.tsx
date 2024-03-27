

export default async function deleteBooking(token:string,id:string) {
    const res = await fetch(`http://localhost:5000/api/v1/reserves/${id}`, {
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