import React from 'react'
import{Navigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'


//ກວດສອບເວລາການໃຊ້ງານຂອງ taken
const isTokenExpired = (token) => {
    if(!token) return true;
    
    try{
        const decodeToken = jwtDecode(token)
        const currentTime = Date.now() / 1000;

        return decodeToken.exp < currentTime;
    } catch (error) {
        console.log(error)
        return true;
    }
}

const PrivateRoute = ({ children}) => {
    const userData = JSON.parse(localStorage.getItem("USER_DATA"))
    const accessToken = userData?.accessToken;
    
    // ກວດສອບເງື່ອນໄຂກ່ອນການ return
    const isAuthenticated = accessToken && !isTokenExpired(accessToken)

   return isAuthenticated ? children : <Navigate to="/" />
}

export default PrivateRoute;