import { API_URL } from "../Config";

export const isAuthenticated = () => {
  return localStorage.getItem("user");
};
export const authenticateUser = async (token, type) => {
  if (localStorage) {
    if (type === "user") {
      return await getUserPhone(token)
    } else if (type === "doctor") {
      return await getDoctorPhone(token)
    }
    localStorage.setItem("userType", type === "user" ? "user" : "doctor");
  }
};
export const getUserPhone = async(token) => {
  return await fetch(`${API_URL}/users/auth/${token}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getDoctorPhone = async(token) => {
  return await fetch(`${API_URL}/doctors/auth/${token}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}
export const getDoctor = async (id,token) => {
  return await fetch(`${API_URL}/doctors/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const authenticateHospital = async (token) => {
  if (localStorage) {
    localStorage.setItem("user", token);
    await getHospital(token).then((data) => {
      localStorage.setItem("userInfo", JSON.stringify(data.data()));
    });
    localStorage.setItem("userType", "hospital");
  }
};
export const getHospital = async (id,token) => {
  return await fetch(`${API_URL}/hospitals/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const getUser = async (id,token) => {
  return await fetch(`${API_URL}/users/${id}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const checkUser = async (id, type) => {
  let result = false;
  if (type === "user")
    await checkUserb(id).then((data) => (result = data.success));
  else await checkdoctorb(id).then((data) => (result = data.success));
  return result;
};
export const checkUserb = async (id) => {
  return await fetch(`${API_URL}/users/user/exist/${id}`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  }
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const checkdoctorb = async (id) => {
  return await fetch(`${API_URL}/doctors/doctor/exist/${id}`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  }
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const register = async ({
  name,
  phone,
  address,
  state,
  city,
}) => {
  return await fetch(`${API_URL}/users/register`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name,phone: "+91" + phone,address,state:state.toUpperCase(),city:city.toUpperCase()})
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const registerHospital = async (hospital_Info) => {
  return await fetch(`${API_URL}/hospitals/register`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...hospital_Info})
  }).then(res => res.json())
  .catch(err => console.log(err))
};
export const loginHospital = async (email,password) => {
  return await fetch(`${API_URL}/hospitals/login`,{
    method : 'POST',
    headers : {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({email,password})
  }).then(res => res.json())
  .catch(err => console.log(err))
}

export const signout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userType')
  localStorage.removeItem('token')
};
export const typeOfUser = () => {
  let user = localStorage.getItem("userType");
  return user;
};
export const checkUserTypeAndReturnData = async(token) => {
  return await fetch(`${API_URL}/users/check`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}