import React, { useState, useEffect} from 'react'
import './listItem.scss'
import { ReactComponent as Present } from '../../common/sideNav/present.svg'
import { ActivityInList } from './activityInList'
import { CATEGORIES } from '../../../utils/enums';
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'

export const ListItem = ({data, openMenuFunc, updateListProgress, showActivity, rewards}) => {

    const lists = rewards && rewards.length > 0 ? rewards : [];
    const max = Math.max(...lists);
    //const min = Math.min(...lists);
    const [progress, setProgress] = useState(0);
    const one = max / 100;
    const [missionData , setMissionData] = useState(null);
    const [isLike, setIsLike] = useState(false);
    const [isUnLike, setIsUnLike] = useState(false);

    useEffect(() => {
        if(data.assignedActs && (!missionData)){
            setMissionData(data.assignedActs);
            let progressTemp = 0;

            data && data.assignedActs.forEach(mission => {
                if(mission.completed){
                    progressTemp += mission.time;
                }
            })

            setProgress(progressTemp);
        }
    },[data,missionData])

    const like = () => {
        setIsLike(true);
        setIsUnLike(false);
        console.log('like');
    }

    const unLike = () => {
        setIsLike(false);
        setIsUnLike(true);
        console.log('unLike');
    }

    const listPosition = lists.map(lists =>({pos : lists / one, value: lists }));

    const markAsDone = (actId) =>{
        let newProgress = progress;
            const newMissionData = missionData.map((act=> {
                if(act.id === actId){
                    act.completed = true;
                }
                if(act.completed && act.id === actId){
                    newProgress =  newProgress + act.time;
                }
                return act;
            }))
            setMissionData(newMissionData);
            setProgress(newProgress);
            updateListProgress(missionData, data.id);
    }


    return (
        <div id={data.id} className="listItem">
            <header>
                <div className="headerAndMore">
                    <h2>{data.title}</h2>
                    {/* Pass listID to openMenuFunc as parameter*/}
                    <div onClick={e => openMenuFunc(e, data.id)}/>
                </div>

                <div className="prograss">
                { rewards &&rewards.length > 0 && listPosition.map((item,i)=>
                    <span key={i} className={progress >= item.value ? 'green' : ''} style={{left:`${item.pos}%`}}>
                        <Present style={{left: `${i === listPosition.length - 1 ? '-30px' : '-17px'}`}}/>
                    </span>)
                }
                    <div className="fill" style={{width:`${progress / one }%`}}/>
                </div>

                { rewards &&rewards.length > 0 && 
                <div className="feedBack">
                        <span>{progress}</span><span> / {max}</span>
                </div>}
                {
                    missionData &&  missionData.map((act,i)=>{
                        const {category} = act;
                        const categoryData = category && CATEGORIES[category.toLowerCase()]!==undefined? CATEGORIES[category.toLowerCase()]: CATEGORIES["none"];

                        if (act.description || act.title){

                            if(!act.completed){
                                return  <ActivityInList showActivity={showActivity} markAsDone={markAsDone} category={categoryData} data={act} key={act.id}/>
                            }else{
                                return (
                                    <div className="collapseActivity done" key={act.id} style={{backgroundColor:categoryData.color, color:'#fff'}}>
                                        <span className="howWasIt">How was it? - {categoryData.text}</span>
                                        <span>
                                            <AiOutlineLike
                                                className="like"
                                                onClick={!isUnLike && like}
                                                style={{color: isUnLike ? '#9013fe75' : '#9013fe'}}/>
                                            <AiOutlineDislike
                                                className="unLike"
                                                onClick={!isLike && unLike}
                                                style={{color: isLike ? '#9013fe75' : '#9013fe'}}/>

                                        </span>
                                    </div>
                                )
                            }
                        }
                        //else return(<div/>);
                    })
                }

            </header>


        </div>
    )
}
