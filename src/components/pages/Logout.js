import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react';

function Logout (){
    const handleLogout = () => {
        console.log("Clicked")
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        useNavigate('/home')
        window.location.reload()
    }

    return(handleLogout())
}

export default Logout;