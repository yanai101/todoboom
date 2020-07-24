import React from 'react';
import styled from 'styled-components';

const Button = ({onClick, children,secondary}) => (
	<Container onClick={onClick} secondary={secondary}>
		{children}
	</Container>
);


export default Button;

const Container = styled.div`
	padding: 0 15px;
	height: 32px;
	min-width: 80px;
	font-weight: 500;
	cursor: pointer;
	transition: all 300ms;
	border-radius: 2px;
	margin: 5px;
	background: ${({theme}) => theme.purple1};
	color: ${({theme}) => theme.p0};
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;


	&:hover {
	}

	${({secondary, theme}) => secondary && `
		background: ${theme.p0};
		color: ${theme.purple1};
		border: 1px solid ${theme.purple1};

	`};



`;
