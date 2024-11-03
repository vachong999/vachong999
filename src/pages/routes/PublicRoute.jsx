import React from 'react'
import{Navigate } from "react-router-dom"

function PublicRoute({ children }) {
    //ດິງ token ຈາກ localStorage ມາເພື່ອດັກເງື່ອນໄຂໃສການໃຊ້ງານ 
    const inAuthenticated =!!localStorage.getItem('authToken')

    return isAuthenticated ? <Navigate to="dashhoard" /> : children;

}

export default PublicRoute;
