import React, { useEffect, useState } from 'react'
import './sideNav.scss';
import {FaToolbox , FaTasks , FaCaretLeft} from 'react-icons/fa'
import {IoIosGift , IoMdSettings} from 'react-icons/io'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user.actions';
import { ReactComponent as Logout } from './logout.svg'; 
import { ReactComponent as Audit } from './audit.svg'; 
import { ReactComponent as Present } from './present.svg'; 
import { ReactComponent as Logo } from './logo.svg'; 
import {FiLogOut} from 'react-icons/fi'


export default function SideNav({onClick , active =''}) {
    const [activeUrl , setActiveUrl] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setActiveUrl(active.split('/')[1]);
        console.log(activeUrl)
    },[active , activeUrl])




    return (
        <div className="sideNav">
            <Link to="/marketplace"><Logo className="logo"/></Link>
            
            <div className="actions">
                <Link to="/marketplace" className={`linkNav sideNavIcon ${activeUrl === 'marketplace' ? 'active' : ''}`}>
                    <FaToolbox className="sideNavIcon"/>
                    {activeUrl === 'marketplace' && <FaCaretLeft className="activeIcon"/>}
                </Link>
                <Link to="/list" className={`linkNav sideNavIcon ${activeUrl === 'list' ? 'active' : ''}`}>
                    <Audit className="sideNavIcon"/>
                    {activeUrl === 'list' && <FaCaretLeft className="activeIcon"/>}
                </Link>
                <Link to="/rewards" className={`linkNav sideNavIcon  ${activeUrl === 'rewards' ? 'active' : ''}`}>
                    <Present className="sideNavIcon"/>
                    {activeUrl === 'rewards' && <FaCaretLeft className="activeIcon"/>}
                </Link>
            </div>
            <FiLogOut className="sideNavIcon setting" onClick={() => dispatch(logout())}/>
            {/* <IoMdSettings className="sideNavIcon setting" onClick={() => dispatch(logout())}/> */}
        </div>
    )
}
