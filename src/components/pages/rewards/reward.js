import React, { useState , useCallback, useRef } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import style from './reward.module.css';
import {MdDone} from 'react-icons/md';



const Reward = ({title, time, index, onSave,onDelete}) => {
    // const dispatch = useDispatch();
    const inputTime = useRef(null);
    const inputDescription = useRef(null);
    const [isSave, setIsSave] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isTimeValid, setIsTimeValid] = useState(true);


    const saveReward = useCallback(() => {

        let timeFlag = true;
        let descFlag = true;

        if (inputTime.current.value.length <= 0){
            timeFlag = false;
            setIsTimeValid(false);
        }else {
            setIsTimeValid(true);
        }

        if (inputDescription.current.value.length <= 0){
            descFlag = false;
            setIsDescriptionValid(false);
        }else {
            setIsDescriptionValid(true);
        }


        ////TODO : Ester - save rewards in the block
        if (timeFlag && descFlag){
            setIsSave(true);
            onSave({index, title: inputDescription.current.value , time:inputTime.current.value})
        }

    },
    []
    );

	return (
            <RawardContainer>
                <div className={style.contentItemsCenter}>
                    <img src={require('./images/present.png')}/>
                    <h2 className={style.rewardTitle}>Reward #{index+1}</h2>
                </div> 

                <div className={style.userImputContainer}>
                    <div  className={style.timeArea}>
                        <h4>Time to earn</h4>

                        <div className={style.timeInputContainer}
                             style={{border: isTimeValid ? '2px solid #9013fe' : '2px solid #f75f5b'}}>

                            <div className={style.first}>
                                <input 
                                    ref={inputTime} 
                                    type="number"
                                    defaultValue={time}
                                    disabled={time && title.length ? true: false}
                                    min={time} max="999"/>
                            </div>
                            <div className={style.secound}>
                                <span>min</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.descriptionArea}>
                        <h4>Reward description</h4>
                        <div className={style.contentItemsCenter}>

                            <input
                                ref={inputDescription}
                                defaultValue={title}
                                disabled={title.length > 0 ? true: false}
                                style={{border: isDescriptionValid ? '2px solid #9013fe' : '2px solid #f75f5b'}}
                                placeholder="e.g. Choose your favorite takeout for the whole family.." type="text"/>

                            {(!isSave && !title) && <MdDone className={style.save} onClick={saveReward}/>}
                            <div className={style.trash} onClick={()=>onDelete({title,time,index})}></div>
                        </div>
                    </div>

                </div>
            </RawardContainer>
	);
};


const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(withRouter(Reward));


const RawardContainer = styled.div`
    min-height: 200px;
    margin: 45px auto 0;
    padding: 16px;
    border: 1px solid #9013fe;
    border-radius: 4px;
`;
