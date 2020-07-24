import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const AuthContainer = ({children}) => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  
  useEffect(() => {
    if (user && user.uid) {
        history.push('/marketplace');
    } else {
      console.log("navigate back to home Page if not logged in????")
      history.push('/');
    }
  }, [user,history]);

  return (
    <>{children}</>
  );
};

export default AuthContainer;
