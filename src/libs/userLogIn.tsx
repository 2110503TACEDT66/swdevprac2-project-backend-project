export default async function userLogin(userEmail:string, userPassword:string, provider?:string) {
    const res = await fetch(`http://localhost:5001/api/v1/auth/login`, {
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