import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, connect} from "react-redux";

import Slider, { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';


import { CATEGORIES } from '../../utils/enums';
// components

import Button from '../common/Button';
import TextInput from '../common/TextInput';
import ClickOut from '../common/ClickOut';
import Spinner from '../common/Spinner';
import FileLoader from '../common/FileLoader';

import {addActivity} from "../../redux/actions/activity.actions";

const AddActivityTmp4Esther = ({history, user}) => {
	const dispatch = useDispatch();


	//const [ID, setID] = useState("");
	const [category, setCategory] = useState("");//drop down list
  const [title, setTitle] = useState("New activity");
	const [url, setUrl] = useState("none");//
	const [description, setDescription] = useState("none");
	const [time, setTime] = useState(0);//in minutes
	const [minAge, setMinAge] = useState(0);//optional
	const [maxAge, setMaxAge] = useState(120);//optional


	const [imageSrc,setImageSrc] = useState(null);
	const [showMenu,setShowMenu] = useState(false);


	const marks = {
  15: '15',
  30: '30',
  45: '45',
  60: '60+',
};
	const marksAge = {
  1: '1',
  3: '3',
  5: '5',
  7: '7',
  10: '10',
  12: '12',
  14: '14',
  16: '16',
  18: '18+',
};

	//technology: TBD?
  //isPDF
  //isAndroid
  //isiOS
  //isChrome
  //isFirefox
  //isIE



  const categories = Object.keys(CATEGORIES);
  const active = "true";

  const onAgeRangeChange = useCallback(value=>{
    setMinAge(value[0]);
    setMaxAge(value[1]);
  },[setMinAge, setMaxAge]);


  const onAddtoFirebase = useCallback(action=>{
    //setID(action.id);
  },[/*setID*/]);


	const addToFireBase = useCallback(()=>{
		// TBD check input errors

				const date = new Date();
	      const createDateMSec = date.valueOf();
	      const createDate = date.toString();
        if(!user.uid){
          console.log("Please login before adding activity");
        }
				const uid = user.uid? user.uid: "loggedOut";
				const email = user.email? user.email: "loggedOut";
				const displayName = user.displayName? user.displayName: "loggedOut";
        const minMaxAgeRange = (1000*minAge + maxAge);
				const newAct = {
                        category,
                        title,
                        url,
                        description,
                        time,
												minAge,
												maxAge,
                        minMaxAgeRange,
                        createDateMSec,
                        createDate,
					              uid,
                        email,
                        displayName,
												imageSrc,
                        active};
				dispatch(addActivity(newAct, onAddtoFirebase));
				history.push('/marketplace');

	},[category, time, maxAge, minAge, title, url,user, onAddtoFirebase,description, imageSrc, dispatch,history]);



  if(false)//TBD: if(!topics || topics===undefined)//await return of topics from firebase
  return (<Page>
  						<H1>loading topics</H1>
 						<Spinner/>
 					</Page>)
          //else:
					//<H1>{ID}</H1>
	return (
    <Page>
			<H1>ADD A NEW ACTIVITY</H1>
			<Row>
	      <Col width="30%">

					<Label>Activity type</Label>
					<ClickOut onClick={()=>setShowMenu(false)}>
							<Box onClick={()=>setShowMenu(!showMenu)}>
							{category? category:"Select your category"}
							</Box>
              <Menu visible={showMenu}>
              {
                categories.map(item => <MenuItem key={`menuItem_${item}`} onClick={()=>{setCategory(item);setShowMenu(false)}}>{item}</MenuItem>)
              }

              </Menu>
		      </ClickOut>
					<TextInput onChange={event =>setUrl(event.target.value)} label="Link to activity (optional)" placeholder="Copy and paste the activity’s web address">url</TextInput>
		      <TextInput onChange={event =>setTitle(event.target.value)} label="Activity title" placeholder="Name your activity"/>
		      <TextInput onChange={event =>setDescription(event.target.value)} label="Activity description (optional)" placeholder="Describe your activity in detail"/>
					<Label>Activity duration (estimated)</Label>
					<Slider min={0} max={60} marks={marks} railStyle={{backgroundColor:'#9013fe'}} onAfterChange={value=>setTime(value)}/>
					<Label>Suitable for ages</Label>
					<Range min={0} max={18} marks={marksAge} railStyle={{backgroundColor:'#9013fe'}} onAfterChange={value=>onAgeRangeChange(value)}/>
				</Col>
				<Col width="60%">
					<FileLoader width="100%" onDone={obj=>{setImageSrc(obj.downloadURL)}}/>
					<TextInput onChange={event =>setImageSrc(event.target.value)} label="Picture URL (optional)" defaultValue={imageSrc}/>
					<SaveCancel>
						<Button onClick={()=>{history.push('/marketplace')}} secondary>Cancel</Button>
						<Button onClick={()=>{addToFireBase()}}>Save</Button>
					</SaveCancel>
				</Col>
			</Row>
    </Page>
	);
};

	//{menu("CATEGORY", category, categories,setCategory)}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps)(AddActivityTmp4Esther);

const Page = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	box-sizing: border-box;

`;

const H1 = styled.div`
	font-size: 2rem;
	font-weight: 500;
	line-height: 1.2;
	color: ${({theme})=> theme.purple1};
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
	margin-top: 20px;
	left:0px;
`;

const SaveCancel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	align-self: flex-end;
	position: absolute;
	bottom: 0;
	right: 0;
`;

const Col = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	margin: 0px 20px 20px 0px;
`;

const Label = styled.div`
	font-size: 16px;
	min-height: 20px;
	width: 100%;
	margin: 30px 0px 10px 0px;
	color: ${({theme})=> theme.purple2};
`;

const Box = styled.div`
	width: 450px;
	height: 32px;
	color: #37383A;
	border: 1px solid #CCCED3;
	border-radius: 2px;
	cursor: pointer;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	font-size: 13px;
	transition: all 300ms;
  padding: 5px 5px 5px 10px;
`;

const Menu = styled.div`
	width: 450px;
	min-height: 100px;
	display: flex;
	flex-direction: column;
	border: ${({theme}) => theme.purple1};
	border-radius: 2px;
	background: #ffffff;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
	position: absolute;
	left: 0;
	overflow: hidden;
	transition: all 300ms;
	pointer-events: none;
	opacity: 0;
	visibility: hidden;
	margin-top: -10px;

	${({visible}) => visible && `
		pointer-events: all;
		opacity: 1;
		visibility: visible;
		margin-top: 0px;
	`};
`;

const MenuItem = styled.div`
	font-size: 14px;
	width: 100%;
	min-height: 40px;
	border-bottom: 1px solid ${({theme}) => theme.p100};
	display: flex;
	align-items: center;
  flex-direction: row;
	cursor: pointer;
	transition: all 300ms;
	box-sizing: border-box;
	padding: 0 10px;

	&:hover {
		background: ${({theme}) => theme.a100};
	}

	&:last-child {
	border: none;
	}
`;
