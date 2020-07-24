import React, {useCallback, useState, useRef} from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import plus from '../../assets/plus.svg';

import { Button } from 'react-bootstrap';
//import Progress from './Progress';

const FileLoader = ({onDone,url}) => {

  const dispatch = useDispatch();

  const [currentFile, setCurrentFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [label, setLabel] = useState("file_location");
	const [imgLocation, setImageLocation] = useState("");
	const [error, setError] = useState("status");
  const inputImg = useRef(null);


  const setFileAndUpload = useCallback((e) =>{
    const file = e.target.files[0];
    setCurrentFile(file);
    const action = {
      type: "UPLOAD_FILE",
      payload: {file,setProgress,setLabel,onDone,setImageLocation}
    }
    dispatch(action);
  },[setCurrentFile,dispatch,onDone]);


  const uploadFile = useCallback(() =>{
    const action = {
      type: "UPLOAD_FILE",
      payload: {currentFile,setProgress,setLabel,onDone}
    }
    dispatch(action);
  },[currentFile,dispatch,onDone]);

  const checkFile = useCallback(()=>{
    const action ={
      type: "CHECK_FILE",
      payload:{currentFile,setLabel,setError,uploadFile,onDone}
    }
    dispatch(action);
  },[currentFile,dispatch,uploadFile,onDone]);

  const clickFile = useCallback(e=>{
      inputImg.current.click();
    },[inputImg]);

  return(
    <Container>
      <Image src={imgLocation}/>
      <AddImgButton onClick={clickFile}>
        <img src={plus}/>
      </AddImgButton>
      <Col>
        <Title>Activity picture</Title>
        <Label>We’ll try to find a picture automatically from the activity link (if you enter one)</Label>
      </Col>
      <Input type="file" onChange={event => {setFileAndUpload(event)}} ref={inputImg} hidden/>
      <StatusLabel hidden>{error}</StatusLabel>
      <StatusLabel>{label}</StatusLabel>
    </Container>
  );

}
//<Progress disabled={file===undefined} percentage={progress}/>
// <Button disabled={file===undefined} onClick={checkFile}>UPLOAD_FILE</Button>
export default FileLoader;


const Container = styled.div`
	width: 840px;
  height: 380px;
	display: flex;
	position: relative;
  border-color: ${({theme})=>theme.purple2};
  border-style: dotted;
`;

const Col = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px 10px 10px 10px;
`;

const Image = styled.div`
	width: 95%;
	height:  95%;
	position: absolute;
	top: 2px;
	left: 2px;
	background: url(${({src}) => src}) no-repeat center;
  z-index:-1000;
	background-size: contain;

 `;

const Title = styled.div`
  font-size: 34px;
  min-height: 20px;
  color: ${({theme})=> theme.purple2};
`;

const AddImgButton = styled.div`
  left: 410px;
  top: 180px;
`;




const Label = styled.div`
	font-size: 16px;
	min-height: 20px;
	color: ${({theme})=> theme.purple2};
	${({error, theme}) => error && `
		color: ${theme.r500};
	`};
`;
const StatusLabel = styled.div`
  width: 100px;
  height: 20px;
  ${({hidden}) => hidden && `
    opacity: 0;
  `};
`;

 const Input =styled.input`

 `;
