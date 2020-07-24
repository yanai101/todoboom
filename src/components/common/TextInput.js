import React from 'react';
import styled from 'styled-components';

const TextInput = ({label, type = "text", onChange, placeholder, className, error, defaultValue}) => {
	return (
		<Container className={className}>
			<Label error={error}>{label}</Label>

			<Input
				placeholder={placeholder}
				defaultValue = {defaultValue}
				type={type}
				onChange={onChange}
				error={error}
			/>
		</Container>
	);
};

export default TextInput;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 450px;
	margin: 10px 0px 10px 0px;
`;

const Label = styled.div`
	font-size: 16px;
	min-height: 20px;
	margin: 5px 0px;
	color: ${({theme})=> theme.purple2};
	${({error, theme}) => error && `
		color: ${theme.r500};
	`};
`;

const Input = styled.input`
	width: 100%;
	min-height: 32px;
	height: 100%;
	box-sizing: border-box;
	padding: 0 10px;
	font-size: 13px;
	color: ${({theme}) => theme.p600};
	transition: all 300ms;
	border: 1px solid ${({theme}) => theme.p200};

	${({error, theme}) => error && `
		border: 1px solid ${({theme}) => theme.r500};
	`};
	border-radius: 3px;

	&::placeholder {
		color: ${({ theme }) => theme.p300};
	}

	&:focus {
		border-color: ${({theme}) => theme.a400};
		outline: none;
	}
`;
