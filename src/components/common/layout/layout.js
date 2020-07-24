import React, { useState } from 'react'
import SideNav from '../sideNav/sideNav'
import './layout.scss';

export default function Layout({children , location}){
    
    const [sideNavOpen , setSideNavOpen] = useState(false)
    const hideNavBar = ['/', '/login'];
    const toggleSideNav =()=>{
        setSideNavOpen(!sideNavOpen);
    }


    return (
        <main className={`mainLayout ${sideNavOpen ? 'open' : ''}`} >
            {!hideNavBar.includes(location.pathname) &&
                <div>
                    <SideNav active={location.pathname} onClick={toggleSideNav}/>
                </div> 
                }
            <div>
                {children}
            </div>
        </main>
)

}
