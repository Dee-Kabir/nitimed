import { API_URL } from "../Config"
export const sendEmail = async(from,text) => {
    return fetch(`${API_URL}/email/sendEmail`,{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from : from ,
            text: text
        })
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const getOtp = async(email) => {
    return fetch(`${API_URL}/email/sendOtp`,{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const resetPass = async(token,id,password) => {
    return fetch(`${API_URL}/email/verifyOtp`,{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token,id,password})
    }).then(res => res.json())
    .catch(err => console.log(err))
}