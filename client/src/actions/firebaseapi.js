import firebase from "../firebaseHelper";
import { API_URL } from "../Config";
export const setLanguageCode = () => {
  firebase.auth().useDeviceLanguage();
};
export const sigininWithPhoneNumber = (phone, recaptcha) => {
  let phoneNumber = "+91" + phone;
  return firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha);
};
export const editHospitalInfo = async (data, id,token) => {
  return await fetch(`${API_URL}/hospitals/${id}`,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body : JSON.stringify(data)
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const editInfo = async (name, address, state, city,id,token) => {
  return await fetch(`${API_URL}/users/${id}`,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({name,address,city,state})
  }).then(res => res.json())
  .catch(err => console.log(err))
};

export const addDoctortoHospital = async (hospitalId, doctor, token) => {
  return fetch(`${API_URL}/hospitals/add-doctor/${hospitalId}`,{
    method:'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body : JSON.stringify({doctor,token})
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const bookAppointment = async(data,token) => {
  return await fetch(`${API_URL}/appointments`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({...data})
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const completeAppointments = async(id,completed,token) => {
  return await fetch(`${API_URL}/appointments/${id}`,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({completed: completed})
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getPendingAppointments = async(id,token) => {
  return await fetch(`${API_URL}/doctors/pending-appointments/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getCompletedAppointments = async(id,token) => {
  return await fetch(`${API_URL}/doctors/completed-appointments/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getUserAppointments = async(id,token) => {
  return await fetch(`${API_URL}/users/get/appointments/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const findDoctorByName = async (name, category) => {
  // let value = name.toUpperCase();
  return await fetch(`${API_URL}/doctors/query?category=${category}&name=${name}`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
  // return await doctorsRef.where(`${category}`, "==", `${value}`).get();
};
export const uploadFileToFirestore = async (data) => {
  
  // data.map(async(d) => {
    await fetch(`${API_URL}/doctors/register`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data})
    })
  // });
};
export const savedoctor = async (data) => {
  return await fetch(`${API_URL}/doctors/register`,{
    method: 'POST',
    body: data
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const changeAvailability = async(id,token,available) => {
  return await fetch(`${API_URL}/doctors/set/available/${id}`,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({'available':available})
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const findHospitals = async (value, type) => {
  let val = value.toUpperCase();
  return await fetch(`${API_URL}/hospitals?type=${type}&value=${val}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const editDoctor = async (
  name,
  email,
  id,
  phone,
  qualification,
  jobType,
  servingType,
  workTime,
  weekdays,
  address,
  speciality,
  state,
  city,
  fee,
  token
) => {
  return await fetch(`${API_URL}/doctors/${id}`,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body : JSON.stringify({name,
      email,
      id,
      phone,
      qualification,
      jobType,
      servingType,
      workTime,
      weekdays,
      address,
      speciality,
      state,
      city,
      fee,})
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const setRoomIdOfHostInFirebase = async(roomId, userId,token) => {
  console.log("userId",userId,"roomId",roomId)
  return await fetch(`${API_URL}/doctors/set/roomId/${userId}`,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({roomId: roomId})
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getRoomId = async(doctorId,token) => {
  console.log("doctorId",doctorId)
  return await fetch(`${API_URL}/users/roomId/${doctorId}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getDoctorsOfHospital = async(id,token) => {
  return await fetch(`${API_URL}/hospitals/doctors/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getAppointment = async(id,token) =>{
  return await fetch(`${API_URL}/appointments/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
