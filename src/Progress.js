import React from 'react';
import styled, { css } from 'styled-components';

const Progress = ({ color, percentage, disabled, className }) => {
	return (
		<Strip className={className} disabled={disabled}>
			<Outer className="outer">
				<Inner
					percentage={percentage}
					color={color}
					disabled={disabled}
					className="inner"
				/>
			</Outer>
		</Strip>
	);
};

export default Progress;

const Outer = styled.div`
  width: 100%;
	min-width: 120px;
  height: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.p100};
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 10px;
	width: 0;
	background: ${({ theme, color }) => color || theme.a400};
	max-width: ${({ percentage }) => `${percentage}%`}
	transition: all 100ms;
  animation: 1000ms ease-out 0s 1 stretchRight forwards;

  @keyframes stretchRight {
		100% {
			width: 100%;
		}
	}
`;

const Strip = styled.div`
  display: flex;
  align-items: center;
  height: 10px;
  width: 100%;

  ${({ disabled }) =>
	disabled &&
	css`
      pointer-events: none;
    `};
`;
