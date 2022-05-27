import { useContext } from "react"
import { SettingsContext } from "../../context/context"
import{Card ,Elevation} from "@blueprintjs/core"
export default function CompletedList(props){

const setting =useContext(SettingsContext);
console.log(props.list)
let completed =props.list.filter(item=>item.complete===true)

if(setting.showCompletedItems){
 return (
     <>
<Card interactive={true} itemvation={Elevation.TWO} style={{ width: "500px" }}>
    <h3> completed tasks</h3>
{completed.map(item =>(
     <div key={item.id}>
     <p>{item.text}</p>
     <p><small>Assigned to: {item.assignee}</small></p>
     <p><small>Difficulty: {item.difficulty}</small></p>
     <hr />
     <button onClick={props.deleteItem}> delete</button>
   </div>
))
}
</Card>
     </>
 )}
 else{
     return (
         <>
   <Card interactive={true} itemvation={Elevation.TWO} style={{ width: "500px" }}>
   <h3> There's no completed task</h3>
     </Card>
     </>
     )
 }



}