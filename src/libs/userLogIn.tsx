export default async function userLogin(userEmail:string, userPassword:string, provider?:string) {
    const BACKEND_URL= process.env.BACKEND_URL

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            provider: provider
        })
    })
    if(!res.ok) {
        throw new Error('Failed to Login')
    }

    return await res.json()
}