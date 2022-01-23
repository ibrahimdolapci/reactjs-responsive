import {Layout} from "antd";
import {EventList} from "./list";
import {EventDetails} from "./details";

export function Events() {
    return (
        <Layout style={{height: "100vh", padding: 50, overflow: 'hidden'}}>
            <div style={{display: 'flex', height: "100%"}}>
                <EventList/>
                <EventDetails/>
            </div>
        </Layout>
    )
}
