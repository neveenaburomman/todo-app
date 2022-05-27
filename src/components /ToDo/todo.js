import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import useForm from '../../hooks/form.js';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../../context/context';
import CompletedList from '../List/CompletedList'
import ReactPaginate from 'react-paginate';

const ToDo = () => {

  const setting = useContext(SettingsContext);

  const [list, setList] = useState(JSON.parse(localStorage.getItem('list'))||[]);

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  /////
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  ////
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + setting.item;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / setting.item));
  }, [itemOffset,setting.item,list]);

  // Invoke when user click to request another page.

  const handlePageClick = (event) => {
    const newOffset = (event.selected * setting.item) % list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log(setting.item)

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    console.log("deeeeeeeeeeeeelete")
    setList(items);
    console.log(list)
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
    let completed =list.filter(item=>item.complete===true)
    if (completed.length===0){
    setting.setShowCompletedItems(false);
    }
    else{
    setting.setShowCompletedItems(true);
      }
    }
    

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);
 
   
  let completedTask=list.filter(item=>item.complete===true)
console.log(completedTask);

useEffect(() => {
  let data = localStorage.getItem('list');
  let parsedData = JSON.parse(data);
  if(parsedData){
    setList(parsedData);
  }
},[])

  return (
    <>
      <header>
        <h1 style={{ backgroundColor: "grey", width: "400px", color: "white" }}>To Do List: {incomplete} items pending </h1>
      </header>

      <Card interactive={true} itemvation={Elevation.TWO} style={{ width: "500px" ,margin: " 0" ,float:'none',marginBottom:"10px"}}>


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
            <Button type="submit">Add Item</Button>
          </label>
        </form>

      </Card>
      <br></br>

      
      <br></br> 
      
      <Card interactive={true} itemvation={Elevation.TWO} style={{ height:"200px",display: "flex", flexWrap: "wrap" ,backgroundColor:'blue' }}>

      {list.map(item => (
        <Card  style={{ height:"150px"}}>
        <div key={item.id}>
          <p style={{fontWeight: "bold"}}>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <p></p>
          <br></br> 
          <hr />
          <br></br> 
        </div>
        </Card>
         ))}
         
         </Card>
         
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
          />
         <br></br> 
         <Button type="submit" onClick={showTask}> Show completed Tasks </Button>
         <CompletedList  list ={list} deleteItem={deleteItem}/>

    </>
  );

};
export default ToDo;