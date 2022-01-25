import {Typography} from "antd";
import {EventItem} from "./item";
import {IEvent} from "../types";
import {useSelector} from "react-redux";
import {selectDataSource} from "../../../store/events";
import {StyledContainer, StyledList} from "./styles";

export function EventList() {
    const dataSource = useSelector(selectDataSource);

    return (
        <StyledContainer>
            <Typography.Title level={2}>Events</Typography.Title>
            <StyledList
                dataSource={dataSource}
                rowKey="id"
                renderItem={item => <EventItem item={item as IEvent}/>}
            />
        </StyledContainer>
    )
}
