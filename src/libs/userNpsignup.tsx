export default async function userRegister(userName:string,userEmail:string, userPassword:string,userTel:string) {
    try {
        console.log("entry to register");
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "mode": "cors"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                password: userPassword,
                tel: userTel
            }),
        })

    
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("error in userLogin is ",error);
    }

}