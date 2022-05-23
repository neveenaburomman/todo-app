import { Alignment, Navbar, Tab, Tabs } from "@blueprintjs/core";
import './header.css'
export default function header() {
    return (
        <header id="Navbar">

            <Navbar style ={{backgroundColor:"blue" }} >
                <Navbar.Group align={Alignment.LEFT}>
                    <Tabs>
                        <Tab id="Home" title="Home" style ={{color:"white" ,fontSize:"5"}} />
                    </Tabs>
                </Navbar.Group>
            </Navbar>
        </header>
    )
}