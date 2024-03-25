export default async function userLogin(userEmail:string, userPassword:string) {
    const res = await fetch('https://vaccine-app-backend.vercel.app:443/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })
    if(!res.ok) {
        throw new Error('Failed to Login')
    }

    return await res.json()
}