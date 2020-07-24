import React, {Component} from 'react';
import styled from 'styled-components';

class ClickOut extends Component {
	componentDidMount() {
		window.addEventListener('click', this.handleClick);
	}
	
	componentWillUnmount() {
		window.removeEventListener('click', this.handleClick);
	}
	
	handleClick = e => {
		const {onClick} = this.props;
		
		if (!this.el.contains(e.target)) {
			if (onClick) {
				onClick();
			}
		}
	};
	
	handleRef = el => {
		if (el) {
			this.el = el;
		}
	};
	
	render() {
		const {className} = this.props;
		
		return (
			<Relative ref={this.handleRef} className={className}>
				{this.props.children}
			</Relative>
		);
	}
}

export default ClickOut;

const Relative = styled.div`
  position: relative;
`;
