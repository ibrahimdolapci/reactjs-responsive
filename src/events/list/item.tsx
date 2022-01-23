import {Descriptions, List} from "antd";
import {Detail} from "./detail-formats";
import {useDispatch, useSelector} from "react-redux";
import {eventsSlice, selectEvents} from "../../store/events";
import {IEvent} from "../types";
import {useMemo} from "react";

const {selectEvent} = eventsSlice.actions;

export function EventItem({item, ...props}: { item: IEvent }) {
    const {selectedEvent} = useSelector(selectEvents);
    const dispatch = useDispatch();

    const actionDetails = useMemo(() => item.details.find(({title}) => title === 'Aksiyon'), [item.details])

    return <List.Item style={{
        backgroundColor: selectedEvent?.id === item.id ? "rgba(233, 207, 48, 0.2)" : undefined,
        borderLeft: actionDetails?.value === '-' ? "5px solid #E9CF30" : undefined
    }} onClick={() => dispatch(selectEvent(item as any))} {...props}>
        <Descriptions layout="vertical" size="small" column={5}>
            {item.details.slice(0, 5).map(detail => (
                <Descriptions.Item label={detail.title}>
                    <Detail value={detail.value} format={detail.format}/>
                </Descriptions.Item>))}
        </Descriptions>
    </List.Item>
}
