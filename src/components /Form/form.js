
import React from "react"
import { Button, Card, Elevation } from "@blueprintjs/core";
import { SettingsContext } from '../../context/context';
import { useContext, useState } from 'react';
import { loginContext } from '../../context/Auth';
import { When } from 'react-if';

export default function Form(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const setting = useContext(SettingsContext);
  const auth = useContext(loginContext)

  
  const handleitems = (e) => {
    setting.setNumber(parseInt(e.target.value));
  }

  const storageHandler = (e) => {
    localStorage.setItem('settings', JSON.stringify(setting));

  }
  const handleSignUp = (e) => {
    e.preventDefault();
    auth.signUp(userName, password, role);
  }
  const handleLogIn = (e) => {
    e.preventDefault();
    auth.signIn(userName, password);
  }


  return (
    <>
   

        <When condition={auth.isLoggedIn}>
        <Card interactive={true} itemvation={Elevation.TWO} style={{ width: "500px", margin: " 0", float: 'none', marginBottom: "10px" }}>
        <button   style ={{marginLeft:"350px"}} onClick={e => {
          auth.signOut();
        }} className="signOut">sign Out</button>
        

          <form onSubmit={props.handleSubmit}>

            <h2>Add To Do Item</h2>
            <label>
              <span>To Do Item</span>

              <input onChange={props.handleChange} name="text" type="text" placeholder="Item Details" />
            </label>
            <br></br>
            <br></br>

            <label>
              <span>Assigned To</span>
              <input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" />
            </label>
            <br></br>
            <br></br>
            <label>
              <span>Difficulty</span>
              <input onChange={props.handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
            </label>
            <label>
              <Button type="submit">Add Item</Button>
            </label>
          </form>

          <Button type="submit" onClick={props.showTask}> Show completed Tasks </Button>

          <Button type="submit" onClick={storageHandler}> save</Button>

          <Button onClick={props.handleSort} > Sort Items by Difficulty </Button>
              <br></br>
              <br></br>

          <input onChange={handleitems} placeholder="Number Of Task" type="number" min={1} />
          
          </Card>
        </When>
     
      <When condition={!auth.isLoggedIn}>

        <form onSubmit={handleSignUp}>
          <input onChange={e => {
            setUserName(e.target.value);

          }} 
          name="username" type="text" placeholder="Username" />
          <input onChange={e => {

            setPassword(e.target.value);
          }} 
          name="password" type="password" placeholder="Password" />
          <select onChange={ e => { 
            setRole(e.target.value)
          }}>
            <option value="user">User</option>
            <option value="writer">writer</option>
            <option value="editor">editor</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit">SIGN UP</button>

        </form>
        <form onSubmit={handleLogIn}>
          <input onChange={e => {
            setUserName(e.target.value);
          }} name="username" type="text" placeholder="Username" />
          <input onChange={e => {
            setPassword(e.target.value);
          }} name="password" type="password" placeholder="Password" />

          <button type="submit">LOG IN </button>
        </form>
      </When>
    </>
  )
}