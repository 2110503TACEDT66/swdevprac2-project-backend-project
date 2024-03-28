export default async function getAllReserves(token:string) {

    const res = await fetch(`http://localhost:5001/api/v1/reserves`, {
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