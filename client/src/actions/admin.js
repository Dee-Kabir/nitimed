import { API_URL } from "../Config";

export const loginAdmin = async (values) => {
    return fetch(`${API_URL}/admin/login`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const loadPendingAppointments = async(city) => {
    return fetch(`${API_URL}/admin/pending?city=${city}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const findDoctorByNameAndCity = async(district,name) => {
    return fetch(`${API_URL}/admin/queryDoctor?city=${district}&name=${name}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    .catch(err => console.log(err))
}