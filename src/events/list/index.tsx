import {List, Typography} from "antd";
import {EventItem} from "./item";
import {IEvent} from "../types";
import {useSelector} from "react-redux";
import {selectDataSource} from "../../store/events";


export function EventList() {
    const dataSource = useSelector(selectDataSource);

    return (
        <div style={{maxHeight: "100%"}}>
            <Typography.Title level={2}>Events</Typography.Title>
            <List
                style={{height: "100%", overflow: 'auto'}}
                bordered
                dataSource={dataSource}
                rowKey="id"
                renderItem={item => <EventItem item={item as IEvent}/>}
            />
        </div>
    )
}
