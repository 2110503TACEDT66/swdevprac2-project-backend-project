export default async function getAllReserves(token:string) {

    const res = await fetch(`https://presentation-day-1-backend-project-one.vercel.app/api/v1/reserves`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    if(!res.ok) {
        throw new Error('Cannot get reserves')
    }
    // console.log(BACKEND_URL);
    return await res.json()

}