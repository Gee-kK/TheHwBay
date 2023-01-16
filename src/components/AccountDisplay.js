import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import './AccountDisplay.css'

function AccountDisplay() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          setIsLoggedIn(true);
          setUsername(localStorage.getItem('username'));
        }
    }, []);

    const handleDropdown = () => {
        if (dropdownRef.current && dropdownRef.current.contains(document.activeElement)) {
            setShowDropdown(false);
        } else {
            setShowDropdown(!showDropdown);
        }
    }

    // const handleLogout = () => {
    //     console.log("Clicked")
    //     localStorage.removeItem('jwt');
    //     localStorage.removeItem('username');
    //     setIsLoggedIn(false);
    //     setShowDropdown(false);
    // }

    // const handleLogout = () => {
    //     console.log("Clicked")
    //     localStorage.removeItem('jwt');
    //     localStorage.removeItem('username');
    //     setIsLoggedIn(false);
    //     setShowDropdown(false);
    //     window.location.reload()
    // }

    return (
        <>
        <div className='account-container'>
        <div className='account'>
            {isLoggedIn ? (
                <>
                    <div tabIndex={0} onClick={handleDropdown} id='accountButton'>
                        {username}
                    </div>
                    {showDropdown &&
                        <div className='dropdown-content'>
                            <Link to='/profile'>
                                <button>Profile</button>
                            </Link>
                            <Link to='/settings'>
                                <button>Settings</button>
                            </Link>
                            <Link to='/logout'>
                                <button>Logout</button>
                            </Link>
                            
                        </div>
                    }
                </>
            ) : (
                <Link to='/login'>
                    <button id='loginButton'>Login</button>
                </Link>
            )}
        </div>
    </div>
        
        </>
    )
}

export default AccountDisplay;
