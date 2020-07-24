import React, { useState, useEffect } from 'react';

import { FaPlus, FaCheck } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import './addtolist.scss';


export const Addtolist = ({pos , list , addNewList , updateList, togglePopup}) => {
    const [ , setIsOpen] = useState(false);
    const [addInput , setAddInput] = useState(false);
    const [lists , setLists] = useState(list);

    useEffect(() => {
        if(pos){
            setIsOpen(true);
        }
    },[pos])

    useEffect(() => {
        setLists(list)
    },[list])

    const addInputChange=(e)=>{
        if(e.key === 'Enter' && e.target.value.length){
            checkListBeforeInsert(e);
        }
    }

    const checkListBeforeInsert = (e) =>{
        const value = e.target.value;
        const newVal = {title: value};
        const inlist = lists.filter(item=> item.title === value)

        if(inlist.length === 0){
            setLists([...lists, newVal]);
            //TODO: ester-  this is the cb function for the firebase for add to list - from marketplce js
            addNewList(newVal);
        }
        //setAddInput(false);
    }

    const assignActivityToList = (e, currentList) => {
        console.log(currentList, pos.activityId);
        const activityId = pos.activityId;
        const checked  = e.target.checked;

        updateList({checked, currentList, activityId});
    }

    const isActivityInList = (list)=> {
        const inList = list.assignedActs && list.assignedActs.find(item=> item.id && item.id === pos.activityId);
        return inList;
    }

    return (
        pos &&
        <div className="addtolist" style={{top: pos.y - 15 , left: pos.x - 105}}>
            <h6>ADD TO LIST <IoIosClose onClick={()=>{togglePopup(null)}}/> </h6>
            {
            lists.map((item, index) => <div key={index} className="inListCheckbox">
                        <input type="checkbox" checked={isActivityInList(item)} id={`checkBox_${index}`}  onChange={(e)=> assignActivityToList(e, item)}/>
                        <FaCheck className="checkboxV"/>
                        <label className="container" htmlFor={`checkBox_${index}`}>
                        {item.title}
                        {list.assignedActs}
                        </label>
            </div> )
            }

            {
                !addInput ?
                <span className="addListItem" onClick={()=>setAddInput(true)}><FaPlus/>Create new list</span> :
                <input type="text" onKeyPress={addInputChange} onBlur={checkListBeforeInsert}/>
            }
        </div>
    )
}
