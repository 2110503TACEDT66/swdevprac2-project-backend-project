

export default async function getUserProfile(token: string) {
    const BACKEND_URL= process.env.BACKEND_URL

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if(!res.ok) {
        throw new Error('Cannot get user profile')
    }

    return await res.json()

}