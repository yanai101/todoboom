import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import TextInput from './TextInput';

const KeyVal = ({keyName, value, onChange}) => {

  const [val, setVal] = useState(value);

  const update = useCallback(newVal =>{
    setVal(newVal);//set locally
    onChange(newVal)//update parent
  },[setVal,onChange]);

  return(
    <Row>
      <Col width="95%">
        <TextInput label={keyName} placeholder={keyName} defaultValue={val?val:undefined} onChange={event =>update(event.target.value)}>{val}</TextInput>
        <StyledDiv dangerouslySetInnerHTML={{__html: val}}/>
      </Col>
    </Row>
  );
}

export default KeyVal;

const StyledDiv = styled.div`
margin: 5px;
width: 100%;
min-height: 30px;
user-select: all;
`;

const Col = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  direction: ltr;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
`;
