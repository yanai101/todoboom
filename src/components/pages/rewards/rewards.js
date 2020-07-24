import React, {useEffect, useCallback} from 'react';
import {withRouter} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {cloneDeep} from 'lodash';

import {fetchRewards, updateRewardData} from '../../../redux/actions/rewards.actions';
import styled from 'styled-components';
import style from './rewards.module.css';
import Reward from './reward'


const Rewards = ({history, user, rewardsList}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchRewards(user));
    },[dispatch, user])


    function addReward() {
        const newReward = {title:"", time:0, index: rewardsList.length};
        updateRewards(newReward);
    }

    const updateRewards = useCallback(rewardItem=>{
        if(user.uid){//user is logged in
            let data = cloneDeep(rewardsList);
            // replaces 1 element at index==rewardItem.index
            data.splice(rewardItem.index, 1, rewardItem);
            dispatch(updateRewardData({user,data}));
        }
        else{
            history.push('/login');
        }
    },[dispatch, user, rewardsList]);

    const deleteReward = useCallback(rewardItem=>{
        if(user.uid){//user is logged in
            let data = cloneDeep(rewardsList);
            // remove 1 element at index==rewardItem.index
            data.splice(rewardItem.index, 1);
            dispatch(updateRewardData({user,data}));
        }
        else{
        console.log("can't add rewards when logged out")
        }
    },[dispatch, user, rewardsList]);

	return (
        <RewardsContainer>
            <h2 className={style.header}>
                <span>REWARDS</span>
                <small className={style.subHeader}>Define rewards for activity completion</small>
            </h2>

            <div className={style.rewardContainer}>
                {rewardsList && rewardsList.map( (item,index) => <Reward key={index} time={(index+1) * 45} title={item.title} index={index} onSave={updateRewards} onDelete={deleteReward}/> )}
            </div>



            <NewRewardContainer onClick={addReward} className={style.newRewardArea}>
                <div className={style.contentItemsCenter}>
                    <img src={require('./images/plus.png')} alt="present image"/>
                    <h2>NEW REWARD</h2>
                </div>
                <div onClick={addReward} className={style.plus}></div>
            </NewRewardContainer>

        </RewardsContainer>
	);
};




const mapStateToProps = state => {
	return {
		user: state.user,
    rewardsList: state.rewards

	};
};

export default connect(mapStateToProps)(withRouter(Rewards));



const RewardsContainer = styled.div`
    min-height: 500px;
    width: 98%;
`;


const NewRewardContainer = styled.div`
    min-height: 180px;
    margin: 16px auto 0;
    padding: 16px;
    border: 1px dashed #9013fe;
    border-radius: 4px;
`;