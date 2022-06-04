import React ,{ useState , useEffect } from "react";
import JWT from 'jwt-decode';
import cookie from'react-cookies';
import superagent from 'superagent';

import base64 from "base-64";


const API =`https://auth-api-final-project.herokuapp.com/`;

export const loginContext = React.createContext();


export default function LoginProvider (props){
   
    useEffect(()=>{
        const token = cookie.load('Auth');
        if(token){
            validateToken(token)
        }
    },[])



    const [user,setUser] = useState(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);


    async function signUp(username,password,role){
        const response = await superagent.post(`${API}signup`).send({username:username,password:password,role:role});
        console.log(response.body);
    }
    
    const signIn = async (username, password) => {
        const response = await superagent.post(`${API}signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        validateToken(response.body)
    }
    const signOut = () => {
        setIsLoggedIn(false);
        setUser({});
        cookie.remove('Auth');
    }
    const authurized = (action) => {
        return user?.actions?.includes(action);

    }
    const validateToken = (res) => {
        if(res){
        const valid = JWT(res.token);
         if(valid){
             setIsLoggedIn(true);
             setUser(res);
             cookie.save('Auth',res)
         }else{
                setIsLoggedIn(false);
                setUser({});
         }
        }else{
            setIsLoggedIn(false);
            setUser({});
        }
      
    }
    const state = {
        user,
        isLoggedIn,
        signUp,
        signIn,
        signOut,
        authurized,
        setUser,
        setIsLoggedIn,
    }
    
    return (
        <loginContext.Provider value={state}>
            {props.children}
        </loginContext.Provider>
    )
}
