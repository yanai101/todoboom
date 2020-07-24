import React from 'react'
import './activeityInfo.scss';
import { TodoBtn } from '../todoBtn/todoBtn';
import { CATEGORIES } from '../../../utils/enums';
import { IoMdClose } from 'react-icons/io';
import { FaRegClock } from 'react-icons/fa';
import { FiExternalLink } from "react-icons/fi";

export const ActiveityInfo = ({closeCb , activity , openListPicker = null}) => {

    if(!activity) {
        return null;
    }
    const category = CATEGORIES[activity.category.toLowerCase()]!==undefined? CATEGORIES[activity.category.toLowerCase()]: CATEGORIES["none"];
    const imageSrc= activity.imageSrc || 'https://loremflickr.com/320/240' ,
        description= activity.description || "description placeholder",
        colorActivity= category.color,
        activityText = category.text,
        time = activity.time || 0;
    
    const openList = () => {
        closeCb();
        openListPicker(activity)
    }
    return (
        <div className="mask">

            <div className="popup">
                <header style={{backgroundImage: `url(${imageSrc})`}}><IoMdClose onClick={()=>closeCb(null)}/></header>
                <main>
                    <div className="catInfo" style={{backgroundColor:colorActivity}}>
                        <span>{activityText}</span>
                        <span><FaRegClock/> {time} min</span>
                    </div>
                    <div className="mainInfo">
                        {activity.title && <h4>{activity.title}</h4>}
                        {description}

                    </div>
                </main>
                <footer>
                    {activity.url && activity.url !== 'none' &&
                        <a className="linkOut" href={activity.url} target="_blank">
                            <FiExternalLink/>
                            Go to activity
                        </a>
                    }
                    <span>
                        <TodoBtn className="small" reverse={true} onClick={()=>closeCb(null)}>Close</TodoBtn>
                        {openListPicker && <TodoBtn className="small" onClick={openList}>Assign to list</TodoBtn>}
                    </span>
                </footer>
            </div>
            
        </div>
    )
}
