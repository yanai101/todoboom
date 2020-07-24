import React, { useState, useEffect } from 'react';
import {connect, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {cloneDeep} from 'lodash';

import {fetchActivities} from '../../../redux/actions/activity.actions';
import {fetchLists, updateListData, addNewListForUser} from '../../../redux/actions/list.actions';

import style from './marketplace.module.scss';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';

import Spinner from '../../common/Spinner';
import Activity from '../../common/activity/activity';
import { Addtolist } from '../../common/addtolist/addtolist';
import ActivityFilter from '../../common/activityFilter/activityFilter';
import { ActiveityInfo } from '../../common/activeityInfo/activeityInfo';
import { TodoBtn } from '../../common/todoBtn/todoBtn';

let originalActivity =  null;
let timeOut = null;

const Marketplace  = ({activities, user, lists}) => {

    const [listPopupPos , setListPopupPos] = useState(false);
    const [activitiesList , setActivitiesList] = useState([]);
    const [activityInfo , setActivityInfo] = useState(null);
    // TODO: get the list from firebase
    const [list , setList] = useState([]);
    const [filters , setFilter] = useState({ category : [], time : [0,61], age:[0,18]});
    const dispatch = useDispatch();

    useEffect(()=>{
        if(activitiesList.length === 0 ){
            dispatch(fetchActivities(""));
        } 
        setActivitiesList(activities);
        dispatch(fetchLists(user));
    },[dispatch, activities, user])

    const searchChange =(e) =>{
        if(timeOut) clearTimeout(timeOut);
        if(originalActivity === null) originalActivity = activitiesList ;
        const value = e.target.value;
        timeOut = setTimeout(()=>{
            const newActivites = originalActivity.filter(item => item.title.toLowerCase().includes(value) || item.description.toLowerCase().includes(value));
            setActivitiesList(newActivites)
        },500)
        console.log(`typed search for: ${e.target.value}`);
    }
    const faSearchClicked =() =>{
        dispatch(fetchActivities(""));
    }

    const toggleActivityToList = (pos = null) =>{
        setListPopupPos(pos);
    }

    // TODO: -ester -  add list to firebase
    const addNewList = (data) =>{
        dispatch(addNewListForUser({user,data}));

    }

    const addToList = ({checked, currentList, activityId}) =>{
        const found = activities.find(act => act.id===activityId);
        let activityObj = {...found, active: false,completed: false}//active= true/false indicates whether the activity has been completed
        let updated = cloneDeep(currentList);
        let assignedActs = (updated.assignedActs===undefined)? []: updated.assignedActs;

        if(checked){ //checkbox has been selected
            assignedActs.push(activityObj);
        } else{
            assignedActs = assignedActs.filter(assigned=> (assigned.id!==activityId));
        }
        const data = {...updated, assignedActs};
        dispatch(updateListData({user,data}));
    }

    const addFilter = (type, value)=>{
        if(type === 'category'){
            if(filters[type] && filters[type].includes(value)){
                filters[type].splice(filters[type].indexOf(value),1);
            }else{
                filters[type] = filters[type] ?  [...filters[type], value] : [value];
            }
        } else{
            filters[type] = value;
        }
        setFilter({...filters});
        applyFilters();

    }

    function between(x, min, max) {
        return x >= min && x <= max;
    }

    const applyFilters = () =>{
        if(originalActivity === null) originalActivity = activitiesList ;

        const filteredActivities = originalActivity.filter(activity =>{
            let isValid = true;
            if(filters.category.includes(activity.category)) {
                isValid = false;
            }
            if( !(activity.minAge >= filters.age[0]) && !(activity.maxAge <= filters.age[1])){
                isValid = false;
            }
            if(!between(activity.time, filters.time[0], filters.time[1])){
                isValid = false;
            }

            if(isValid) return activity;
        })

        setActivitiesList(filteredActivities)
    }

    return (
        <>
        <h2 className={style.header}>
        <span>MARKETPLACE</span>

        <InputGroup className={style.search}>
            <InputGroup.Append>
                <InputGroup.Text style={{backgroundColor:'transparent', border: 'none'}} id="basic-addon2"><FaSearch onClick={faSearchClicked}/> </InputGroup.Text>
            </InputGroup.Append>
            <FormControl
                style={{backgroundColor:'transparent', borderLeft: 'none'}}
                onChange= {searchChange}
            />
        </InputGroup>
        <Link to={'/addActivity'}><TodoBtn><FaPlus/>Add Activity</TodoBtn></Link>
        <small>Pick your favorite activities and add them to your lists</small>
        </h2>
        <div className={style.activities}>
            {
              (activities.length>0)?
                activitiesList.map(activity => <Activity key={activity.id} showActivityInfo={setActivityInfo} activity={activity} plusClick={toggleActivityToList}/>)
              :<Spinner/>
              }
            
        </div>
        <Addtolist list={lists} updateList={addToList} pos={listPopupPos} togglePopup={toggleActivityToList} addNewList={addNewList}/>
        <ActivityFilter addFilter={addFilter}/>
        {<ActiveityInfo closeCb={setActivityInfo} openListPicker={setListPopupPos} activity={activityInfo}/>}
        </>
    )
}

const mapStateToProps = state => ({
	activities: state.activities,
	user:state.user,
  lists: state.lists
});

export default connect(
	mapStateToProps, // read from redux
)(Marketplace);
