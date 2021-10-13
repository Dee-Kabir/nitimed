import { API_URL } from "../Config";

export const getFaqs = async()=>{
    return await fetch(`${API_URL}/queries/faq`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const getServices = async()=>{
    return await fetch(`${API_URL}/queries/services`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const getTillNow = async()=>{
    return await fetch(`${API_URL}/queries/tillnow`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const getRecordsNumber = async() => {
    return await fetch(`${API_URL}/appointments/get/count`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}