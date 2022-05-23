import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';


export const LoginContext = React.createContext();

const LoginProvider = (props) => {
	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const token = cookie.load('auth');
		validateToken(token);
	}, []);

	function validateToken(token) {
		try {
			const user = jwt.decode(token);
			if (user) setLoginState(true, token, user);
		} catch (error) {
			setLoginState(false, null, {});
			console.log(`Token Validation Error ${error.message}`);
		}
	}

	function setLoginState(loggedIn, token, user) {
		cookie.save('auth', token);
		setUser({ user });
		setLoggedIn(loggedIn);
	}

	function setLogoutState(loggedIn, user) {
		cookie.save('auth', null);
		setUser({ user });
		setLoggedIn(loggedIn);
	}

///sign up 
//login

	function logout() {
		setLogoutState(false, {});
	}

	const state = {
		loggedIn,
		user,
		setLoggedIn,
		login,
		signup,
		logout,
		setUser,
	};

	return (
		<LoginContext.Provider value={state}>
			{props.children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;