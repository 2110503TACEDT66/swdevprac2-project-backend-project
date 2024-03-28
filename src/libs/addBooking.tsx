

export default async function addReserve(startTime:string, endTime:string , id :string , rid:string, tableNumber:string,token:string) {


    const res = await fetch(`https://presentation-day-1-backend-project-one.vercel.app/api/v1/restaurants/${rid}/reserves/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            start: startTime,
            end: endTime,
            id: id,
            table: tableNumber
        })
    })
    if(!res.ok) {
        throw new Error('Failed to Add Booking')
    }

    return await res.json()
}