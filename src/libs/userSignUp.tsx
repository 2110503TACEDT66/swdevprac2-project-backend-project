import axios from 'axios';
const bcrypt=require('bcryptjs');
export default async function userSignUp(userEmail:string, userName:string, userPassword?:string,  userTelephone?:string, isGoogleAccount?:boolean, role?:string) {
    console.log(userName, userEmail, userPassword)
    try {
        if (isGoogleAccount) {
            console.log('Google is true')
            // Generate a random password (e.g., 12 characters)
            const generatedPassword = Math.random().toString(36).slice(-12);
            // Hash the generated password
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            userPassword = hashedPassword;
        }
        console.log(isGoogleAccount)
        const res = await axios.post('http://localhost:5000/api/v1/auth/register',{
                name: userName,
                email: userEmail,
                password: userPassword,
                tel: userTelephone,
                isGoogleAccount: isGoogleAccount,
                role:role
        }, {
            headers: {
                'Content-Type': 'application/json',
                'mode':'cors'
            },
            
        })
        console.log("eiei: ",res.data.isGoogleAccount);
        return res.data
    }
    catch(err) {
        console.error(err);
        throw new Error('Failed to sign up');
    }
        
    
    
}