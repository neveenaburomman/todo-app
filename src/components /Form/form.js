
import React from "react"
import { Button, Card, Elevation } from "@blueprintjs/core";
import {SettingsContext} from '../../context/context';
import { useContext } from "react";

export default function Form(props) {
    const setting = useContext(SettingsContext);

    const handleSave = (e) => {
        localStorage.setItem('settings', JSON.stringify(setting));
        console.log(localStorage)
      }
      const handleitems = (e) => {
        setting.setNumber(parseInt(e.target.value));
      } 
    return (
        <>
         <Card interactive={true} itemvation={Elevation.TWO} style={{ width: "500px" ,margin: " 0" ,float:'none',marginBottom:"10px"}}>

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
                <br></br>
                <br></br>
                <label>
                    <Button type="submit">Add Item</Button>
                </label>
            </form>
            </Card>
            <br></br>
            <Button type="submit" onClick={props.showTask}> Show completed Tasks </Button>
            <Button onClick={props.handleSort} > Sort Items by Difficulty </Button>
            <input onChange={handleitems} placeholder="Number Of Task" type="number" min={1}/>

            <Button type="submit" onSubmit={handleSave}> save </Button>
        </>
    )
}