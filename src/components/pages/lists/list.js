import React, { useCallback,useState,useRef, useEffect} from 'react';
import {useDispatch, connect} from "react-redux";
import './list.scss'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import {addNewListForUser, deleteListByUser, updateListData} from '../../../redux/actions/list.actions';
import {fetchRewards} from '../../../redux/actions/rewards.actions';

import { ListItem } from './listItem';
import { ActiveityInfo } from '../../common/activeityInfo/activeityInfo';
import {IoIosClose} from 'react-icons/io'

 const List = ({user,itemListComponent,rewards}) => {
    const [menuPos, setMenuPos] = useState(null);
    const [isMenuopen, setIsMenuOpen] = useState(false);
    const [currentListID, setCurrentListID] = useState(null);
    const [activityInfo, setActivityInfo] = useState(null);
    const [rewardsScore, setRewardsScore] = useState(null);

    // add list popup
    const [show, setShow] = useState(false);
    const [popupType, setPopupType] = useState("");
    const inputText = useRef(null);

    useEffect(() => {
        if(!rewards)
          dispatch(fetchRewards(user));
        else if(!rewardsScore){
            const rewardsScore = rewards.map(reward => +reward.time)
            setRewardsScore(rewardsScore.sort((a, b) => a - b));
        }
    },[rewards])

    const dispatch = useDispatch();


    const popUp = () =>{
      let modalTitle = "";
      let handlerClick = ()=>{};
      let saveText = "Done";
      let subTitle = ""
      switch(popupType){
        case "newList":
          modalTitle = "Add a new list";
          handlerClick = handleAddList;
          saveText = "Add";
          subTitle = "Name your list";
          break;
        case "rename":
          modalTitle = "Rename the list";
          handlerClick = renameList;
          subTitle = "Type new name";
          break;
        case "duplicate":
          modalTitle = "copy the list";
          handlerClick = duplicateList;
          subTitle = ""
          break;
        default:
          modalTitle = "Modal";
          subTitle = ""
          handlerClick = ()=>{};
          break;
      }


      return(
        <div>
            {
                show &&
                <div className="mask">
                    <div className="modalAddList">
                        <div className="headerModeal">
                            <h2>{modalTitle}</h2>
                            <div className="closeModalAddList"><IoIosClose/></div>
                        </div>

                        <p>{subTitle}</p>
                        <input ref={inputText} type="text"/>

                        <div className="btnArea">
                            <button onClick={()=>setShow(false)}>Cancel</button>
                            <button onClick={handlerClick}>{saveText}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
      )

    }
    const handleAddList = () => {
        const data = {title: inputText.current.value};
        dispatch(addNewListForUser({user,data}));
        setShow(false);
    }

    const openMenu = (e, listID = null) => {
        const element = document.getElementById(listID);

        if (element){
            const {x, y} = element.getBoundingClientRect();
            setCurrentListID(listID);
            const pos = {
                x: x + 397,
                y
            }

            setIsMenuOpen(true);
            setMenuPos(pos);
        }
    }

    const closeMenu = () => {
        setCurrentListID(null);
        setIsMenuOpen(false)
    }


    // Menu pop-up functions

    const renameList = () => {
      //make a shallow copy and change title
      const found = itemListComponent.find(list=>list.id===currentListID)
      const data = {...found, title: inputText.current.value};
      dispatch(updateListData({user,data}));
      setShow(false);
      
    }

    const duplicateList = () => {
      const found = itemListComponent.find(list=>list.id===currentListID);
      const title = `Copy of ${found.title}`;
      const data = {...found, title};
      dispatch(addNewListForUser({user,data}));
      setShow(false);
    }

    const ester_resetList = () => {
        console.log("ester_resetList");
    }

    const fullReset = () => {
        //make a shallow copy and reset assignedActs
        const found = itemListComponent.find(list=>list.id===currentListID)
        const data = {...found, assignedActs:null};
        dispatch(updateListData({user,data}));
        setShow(false);
    }

    const updateListProgress = useCallback((listData,listID) => {
        //make a shallow copy and reset assignedActs
        const found = itemListComponent.find(list=>list.id===listID)
        const data = {...found, assignedActs:listData};
        dispatch(updateListData({user,data}));
        //TODO: ester -  retun  after dispatch old list and not updated list
        setShow(false);
    },[itemListComponent,dispatch,user]);


    const deleteList = useCallback(() => {
  		  dispatch(deleteListByUser({user, currentListID}));
        setShow(false);

  	}, [dispatch, user, currentListID]);


    return (
        <div>
            <div>
            <h2 className="header">
            <span>ACTIVITY LIST</span>
                <small>Edit your todo lists</small>
            </h2>
            </div>
            <main>
                <div className="horizontal">


                    {itemListComponent.map( (item, index) =>                        
                        <ListItem
                            key={index}
                            updateListProgress={updateListProgress}
                            data={item}
                            showActivity={setActivityInfo}
                            rewards = {rewardsScore}
                            openMenuFunc={e =>openMenu(e,item.id)}/> )}


                    <div className="addList"  onClick={()=>{setPopupType("newList");setShow(true);setMenuPos(null);}}>
                        <header>
                            <div className="header2">
                            <div className="plus"></div>
                                <h2>New List</h2>
                            </div>
                        </header>
                        <div className="bigPlus"></div>
                    </div>
                </div>
            </main>

            {menuPos && isMenuopen && <div className="menu" style={{left: menuPos.x - 170, top: menuPos.y}}>
                    <img onClick={()=>closeMenu()} className="closeMenuBtn" src={require('./images/more.png')} alt="closeMenuBtn"/>
                    <p onClick={()=>{setPopupType("rename");setShow(true);setMenuPos(null);}}>Rename list</p>
                    <p onClick={() => {duplicateList();setMenuPos(null)}}>Duplicate list</p>
                    <p onClick={()=> {ester_resetList();setMenuPos(null)}}>Reset list (all undone)</p>
                    <p onClick={() => {fullReset();setMenuPos(null)}}>Full reset(remove all)</p>
                    <p onClick={() => {deleteList();setMenuPos(null)}} className="deleteList">Delete list</p>
                </div>}



        <div className="addListPopUp">
          {popUp()}

        </div>
        <ActiveityInfo closeCb={setActivityInfo} activity={activityInfo} />
        </div>
    )
};

const mapStateToProps = state => {
	return {
		user: state.user,
    itemListComponent: state.lists,
    rewards: state.rewards
	};
};
export default connect(mapStateToProps)(List);