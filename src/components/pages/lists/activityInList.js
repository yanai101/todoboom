import React from 'react'
import './listItem.scss'
//import { ReactComponent as Present } from '../../common/sideNav/present.svg'
import './activity.scss'

export const ActivityInList = ({data,markAsDone, category, showActivity}) => {


    return (
        <div className="activity">
            <div className="activityHeader" style={{backgroundColor:category.color}}>
                <div className= "checkBoxArea">
                    <input type="checkbox" className="checkBox" onClick={()=>markAsDone(data.id)}/>
                    <img src={require("./images/time.png")} alt="clock"/>
                    <p>{data.time}</p>
                </div>

                <div className="titleArea">
                    <span>{data.category}</span>
                </div>
            </div>


            <div className="activityBody">
                <div className="activityImage"><img src={data.imageSrc}/></div>
                <div className="activityDescription">
                    <div className='desc'>
                        <p>{data.description}</p>
                    </div>
                    <button className="dectMoreBtn" onClick={()=>showActivity(data)}>More</button>
                </div>
            </div>
        </div>
    )
}
