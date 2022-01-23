import {useSelector} from "react-redux";
import {selectSelectedEvent} from "../../store/events";
import {Descriptions} from "antd";
import {Detail} from "../list/detail-formats";

export function AdditionalInfo() {
    const event = useSelector(selectSelectedEvent);

    return (
        <Descriptions layout="vertical" size="small" column={2}>
            {event?.details.slice(5).map(item => (
                <Descriptions.Item label={item.title}><Detail key={item.title} value={item.value} format={item.format}/></Descriptions.Item>
            ))}
        </Descriptions>
    )
}
