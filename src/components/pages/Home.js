import React from 'react';
import styled from 'styled-components';


import Button from '../common/Button';

const Home = ({ history }) => {
	return (
		<Page>
			<Hero>
				<Label>
					I am Home.js, App.js contains me. if you want to add more pages- add a page in src/components/pages folder, import it to App.js and add to list of  &lt;Routes &gt;
				</Label>
				<Button onClick={()=>{history.push('/login')}}>Login</Button>
				<Button onClick={()=>{history.push('/AddActivityTmp4Esther')}}>AddActivityTmp4Esther</Button>
				<Button onClick={()=>{history.push('/rewards')}}>Rewards</Button>
				<Button onClick={()=>{history.push('/list')}}>List</Button>
		  </Hero>
		</Page>
	);
};

export default Home;

const Page = styled.div`
   width: 100 vw;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
`;

const Hero = styled.div`
   width: 100vw;
   min-height: 500px;
   background: ${({ theme }) => theme.a100};
   color: #000000;
`;
const Label = styled.div`
   margin: 100px 20px 0 20px;
   line-height: 32px;
`;

