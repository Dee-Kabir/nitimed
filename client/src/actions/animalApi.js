import { API_URL } from "../Config";

export const addAnimal = async(data,id,token) => {
    return await fetch(`${API_URL}/animals/${id}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const fetchAnimals = async(id,token,category) => {
    return await fetch(`${API_URL}/animals/all/${id}?category=${category}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())
    .catch(err => console.log(err)) 
}
export const fetchAnimal = async(id,token) => {
    return await fetch(`${API_URL}/animals/${id}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const updateAnimalOwner = async(id,phone,token) => {
    return await fetch(`${API_URL}/animals/${id}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({phone})
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const suggestVaccine = async(id,vaccineId,token,doctorId) => {
    return await fetch(`${API_URL}/animals/suggestVaccine/${id}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({vaccineId,doctorId})
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const bookVaccine = async(id,refId,token) => {
    return await fetch(`${API_URL}/animals/bookVaccine/${id}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({refId})
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const seminationCompleted = async(id,bullId,token,doctorId) => {
    console.log("front",bullId)
    return await fetch(`${API_URL}/animals/seminationCompleted/${id}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({bullId: bullId,doctorId})
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const getVaccines = async() => {
    return await fetch(`${API_URL}/queries/vaccine`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const fetchValidIds = async(breed,token) => {
    return await fetch(`${API_URL}/animals/validMale?breed=${breed}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(res => res.json())
    .catch(err => console.log(err))
}