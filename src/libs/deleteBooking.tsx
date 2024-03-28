

export default async function deleteBooking(token:string,id:string) {
    const res = await fetch(`https://presentation-day-1-backend-project-one.vercel.app/api/v1/reserves/${id}`, {
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