import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import useForm from '../../hooks/form.js';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../../context/context';
import List from '../List/list.js';

const ToDo = () => {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  const Settings = useContext(SettingsContext);

  function handleClick() {
    Settings.setShow(!Settings.show);
  }

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);


  return (
    <>
      <header>
        <h1 style={{ backgroundColor: "grey", width: "400px", color: "white" }}>To Do List: {incomplete} items pending </h1>
      </header>

      <Card interactive={true} itemvation={Elevation.TWO} style={{ width: "500px" }}>


        <form onSubmit={handleSubmit}>

          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>
          <br></br>
          <br></br>

          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>
          <br></br>
          <br></br>
          <label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
          </label>
          <br></br>
          <br></br>
          <label>
            <Button type="submit">Add Item</Button> <Button onClick={handleClick}> show completed Items</Button>
          </label>
        </form>
      </Card>

      <div className='completed task '>
        {list.map(item => (
          <List item={item} deleteItem={deleteItem} toggleComplete={toggleComplete} />
        ))}
      </div>












    </>
  );

};

export default ToDo;