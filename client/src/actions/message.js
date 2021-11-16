import { API_URL } from "../Config";

export const getMessages = async(appointmentId,category,token) => {
    return await fetch(`${API_URL}/messages/${appointmentId}?category=${category}`,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
      .catch(err => console.log(err))
}
export const postMessage = async(appointmentId,typeOfUser,text,userId,category,token) => {
    return await fetch(`${API_URL}/messages/${appointmentId}`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify({typeOfUser,text,userId,category})
      }).then(res => res.json())
      .catch(err => console.log(err))
}