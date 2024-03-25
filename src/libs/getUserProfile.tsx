

export default async function getUserProfile(token: string) {
    const res = await fetch('https://vaccine-app-backend.vercel.app:443/api/v1/auth/me', {
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