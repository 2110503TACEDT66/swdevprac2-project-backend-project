export default async function getAllResreve(token:string) {
    const BACKEND_URL= process.env.BACKEND_URL


    const res = await fetch(`${BACKEND_URL}/api/v1/reserves`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if(!res.ok) {
        throw new Error('Cannot get reserves')
    }

    return await res.json()

}