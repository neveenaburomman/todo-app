import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import useForm from '../../hooks/form.js';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../../context/context';
import CompletedList from '../List/CompletedList'
import ReactPaginate from 'react-paginate';
import { loginContext } from '../../context/Auth.js';
import { When } from 'react-if';

import Form from '../Form/form.js';
const ToDo = () => {


  const setting = useContext(SettingsContext);

  const [list, setList] = useState([]);

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  /////
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  ////
  const auth = useContext(loginContext)

  useEffect(() => {
    const endOffset = itemOffset + setting.number;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / setting.item));
  }, [itemOffset, setting.number, list]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * setting.number) % list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function handleSort(){
    list.sort(function(a, b){return a-b});
    setting.setSort(!setting.sort)
     setList(list)
     
  }

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    console.log("before", list)
    const items = list.filter(item => item.id !== id);
    console.log("after", items)
    setList(items);

  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  const showTask = () => {
    let completed = list.filter(item => item.complete === true)
    if (completed.length === 0) {
      setting.setShowCompletedItems(false);
    }
    else {
      setting.setShowCompletedItems(true);
    }
  }


  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, incomplete]);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

console.log(localStorage);

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('list'));
  if (items) {
   setList(items);
  }
}, []);

console.log(currentItems)
  return (
    <>
  <When condition={!auth.isLoggedIn}>
=        <h1 style={{ backgroundColor: "grey", width: "600px", color: "white" }}>WELCOME TO THE To-Do List APP! </h1>
=      </When>
    <When condition={auth.isLoggedIn}>
      <header>
        <h1 style={{ backgroundColor: "grey", width: "400px", color: "white" }}>To Do List: {incomplete} items pending </h1>
      </header>
      </When>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} showTask={showTask} handleSort={handleSort}/>

      <When condition={auth.isLoggedIn}> 

      <Card interactive={true} itemvation={Elevation.TWO} style={{ height: "200px", display: "flex", flexWrap: "wrap", backgroundColor: 'blue' }}>

        {currentItems.map(item => (
          <Card style={{ height: "150px" }}>
            <div key={item.id}>
              <p style={{ fontWeight: "bold" }}>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
              <br></br>
              <hr />
              <br></br>
            </div>
          </Card>
        ))}

      </Card>
     
      
      <div style={{ height: "200px", display: "flex", flexWrap: "wrap" }}>
        <ReactPaginate breakLabel="..." nextLabel="next >" onPageChange={handlePageClick} pageRangeDisplayed={6} pageCount={pageCount} previousLabel="< previous" renderOnZeroPageCount={null} />
        <br></br>
      </div>
      <Button type="submit" onClick={showTask}> Show completed Tasks </Button>
      <CompletedList list={list} deleteItem={deleteItem} />
      </When>
    </>
  );

};
export default ToDo;