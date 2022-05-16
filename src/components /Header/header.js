import { Alignment, Navbar, Tab, Tabs } from "@blueprintjs/core";
export default function header() {
    return (
        <header>

            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Tabs>
                        <Tab id="Home" title="Home" />
                    </Tabs>
                </Navbar.Group>
            </Navbar>
        </header>
    )
}