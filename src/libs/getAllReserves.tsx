export default async function getAllResreve(token:string) {

    const res = await fetch('http://localhost:5000/api/v1/reserves', {
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