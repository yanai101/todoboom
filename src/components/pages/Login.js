import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {authenticate, logout} from '../../redux/actions/user.actions';
import styled from 'styled-components';
import './login.scss';
import { ReactComponent as Logo } from '../common/sideNav/logo.svg';
import {FiMail} from 'react-icons/fi'
import {MdLockOutline} from 'react-icons/md'


// components
import ClickOut from "../common/ClickOut";
import TextInput from "../common/TextInput";
import {InputGroup, Form} from "react-bootstrap";



const Login = ({history, user}) => {
	const [description, setDescription] = useState("none");
	const dispatch = useDispatch();
	const uid = user.uid? user.uid: "loggedOut";
	const email = user.email? user.email: "loggedOut";
	const displayName = user.displayName? user.displayName: "loggedOut";

	const buttonbutton = ({onClick, children}) => (
		 	onClick={onClick}>
			{children}
	);

	return (

		<Page style={{background: 'radial-gradient(circle at 50% 50%, #0097df, #6300be 92%)'}}>


			<butback>
			{/* <button onClick={() => history.push('close.png')}>x</button> */}
			{/*	 onClick={clickFile}>*/}
			{/*	<img src={backhome}/>*/}


			</butback>

			<div>
				<Logo className="logo"/>
			</div>

			<h2 className="subTitle">Kids activity marketplace to help keep your sanity</h2>


			<div onClick={() => dispatch(authenticate({provider: 'GOOGLE'}))} className="loginBtns googleLoginBtn"></div>

			<div className="loginBtns facebookLoginBtn" onClickk={() => dispatch(authenticate({provider: 'FACEBOOK'}))}></div>


			<p className="signInWithYourAccount">Or sign in with your account</p>

			<Form.Group className="loginBtns loginEmail">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend"><FiMail/></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Type your email"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                />
                <Form.Control.Feedback type="invalid">
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>


			<Form.Group className="loginBtns">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend"><MdLockOutline/></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Type your password"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                />
                <Form.Control.Feedback type="invalid">
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

			<div className= "loginBtns pesonLoginBtn"></div>

			<p className="dontHaveAccount">Don't have an account? <span className="singUp">Sign up</span></p>

		</Page>
		
	);
};


const mapStateToProps = state => {
	return {
			user: state.user
};
};

export default connect(mapStateToProps)(withRouter(Login));
const Button = styled.div`
background-color:red;
color: white
border-radius:10px
`;
const Page = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
   	color: white;
   	background: #0097df;
`;
 const logotodo = styled.div`
	width: 24vw;
 	min-height: 24vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
 `;
const butback= styled.div`
	height: 32px;
	min-width: 80px;
	font-weight: 400;
	cursor: pointer;
	transition: all 300ms;
	background: red;
	color: #0097df;
	display: flex;
	align-items: center;
`;


const ContainerG = styled.div`
	height: 32px;
	min-width: 80px;
	font-weight: 400;
	cursor: pointer;
	transition: all 300ms;
	background: url('./loginImages//Facebook@2x.png');
	color: white;
	display: flex;
	align-items: center;
	border-radius: 4px;

`;

const ContainerF = styled.div`
	height: 32px;
	min-width: 80px;
	font-weight: 400;
	cursor: pointer;
	transition: all 300ms;
	background: #0070ff;
	color: white;
	display: flex;
	align-items: center;
	height: 24px;.div'
	border: red;
`;

const Hero = styled.div`
	width: 100vw;
	min-height: 500px;
	display: flex;
	align-items: center;
	flex-direction: column;
	background: red;
	color: white;
`;

const down = styled.div`
	width: 100 vw;
	min-height: 500px;
	display: flex;
	align-items: center;
	flex-direction: column;
	background:#0097df;
	color: white;
`;
const Label = styled.div`
   const Row = styled.div\`
 display: flex;
 flex-direction: row-reverse;
 talign-items: flex-end;
 tjustify-content: center;
 twidth: 100%;
 tleft:0px;
 color:red;
`;
const Background = styled.div`
	width: 100vw;
	display: flex;
	align-items: center;
	justify
	color: red;
`;
const Box = styled.div`
	min-width: 120px;
	height: 32px;
	border-radius: 2px;
	background: black;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	color: red;
	font-weight: 200;
	transition: all 300ms;
  margin: 5px;

	&:hover {
		background: ${({theme,red}) => theme.r500};
	}

	background: ${({theme,red})=> red && theme.r500};
	
`;

