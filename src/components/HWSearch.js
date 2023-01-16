import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './HWSearch.css'

function HWSearch(){



    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    window.addEventListener('resize', showButton)


    return(
        <>
            <div className='search'>
                <br></br>
                <h3>Search for your homework</h3>

                <input type="text" placeholder="Search.." id='searchBar' />  

               
               <br />
               <br />
                <Link to={`./`}>
                    <button id='searchButton'>Search</button>
                </Link>

               
            </div>
            
        </>
    )
}




export default HWSearch