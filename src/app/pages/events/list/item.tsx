import {Descriptions, List} from "antd";
import {Detail} from "./detail-formats";
import {IEvent} from "../types";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {StyledNavLink} from "./styles";
import classnames from "classnames";

export function EventItem({item, ...props}: { item: IEvent }) {
    const navigate = useNavigate();

    const actionDetails = useMemo(() => item.details.find(({title}) => title === 'Aksiyon'), [item.details])

    return <StyledNavLink
        className={classnames({'empty-action': actionDetails?.value === '-'})}
        to={`/events/${item.id}`}
    >
        <List.Item className="event-item" onClick={() => navigate(item.id)} {...props}>
            <Descriptions layout="vertical" size="small" column={{xs: 2, md: 5}}
                          labelStyle={{fontWeight: 'bold'}}>
                {
                    item.details.slice(0, 5).map(detail => (
                            <Descriptions.Item key={detail.title} label={detail.title}>
                                <Detail value={detail.value} format={detail.format}/>
                            </Descriptions.Item>
                        )
                    )
                }
            </Descriptions>
        </List.Item>
    </StyledNavLink>
}
