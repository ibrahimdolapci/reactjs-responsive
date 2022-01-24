import {useSelector} from "react-redux";
import {selectSelectedEvent} from "../../store/events";
import {Tabs, Typography} from "antd";
import {AdditionalInfo} from "./details";
import {LocationDetails} from "./location";
import {Actions} from "./actions";
import {Media} from "./media";

const {TabPane} = Tabs;

export function EventDetails() {
    const event = useSelector(selectSelectedEvent);

    if (!event) return null;

    return (
        <div style={{display: 'flex', flexDirection: 'column', flex: "0 0 30%", marginLeft: 20, height: "100%"}}>
            <Typography.Title level={2}>Event Details</Typography.Title>
            <div style={{backgroundColor: 'white', padding: 10, flex: 'auto', overflow: 'auto'}}>
                <Actions/>
                <Tabs>
                    <TabPane tab="Details" key="1">
                        <AdditionalInfo/>
                    </TabPane>
                    <TabPane tab="Location" key="2">
                        <LocationDetails/>
                    </TabPane>
                    <TabPane tab="Media" key="3">
                        <Media/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}
