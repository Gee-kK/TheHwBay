import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
// import About from './pages/About';
// import GoogleLogin, { GoogleLogout, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script';
import LoginComponent from './LoginComp';
import AccountDisplay from './AccountDisplay';



function Navbar() {
    

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/home" className="navbar-logo" id='logo'>
                    The Hw Bay
                </Link>

                
                
                
                {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
            </div>
            <div className='accountDis'>
                                <AccountDisplay />
                            </div>

            {/* <div className='account'>
                <Link to='/login' className='nav-links'>
                    Login
                </Link>
            </div> */}

            <div className='nav'>
                <li className='nav-item'>
                    <Link to='/about' className='nav-links'>
                        About
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/homework' className='nav-links'>
                        Homework
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/schools' className='nav-links'>
                        Schools
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/premium' className='nav-links' id="sign">
                        Premium
                    </Link>
                </li>
            </div>
        </nav>
        </>
    )
}

export default Navbar
