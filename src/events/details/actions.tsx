import {useDispatch, useSelector} from "react-redux";
import {eventsSlice, selectSelectedEvent} from "../../store/events";
import {Button, Col, Row} from "antd";
import {useCallback, useMemo} from "react";
import {EventActions} from "../types";

const {updateEvent} = eventsSlice.actions;

export function Actions() {
    const event = useSelector(selectSelectedEvent);
    const dispatch = useDispatch();

    const actions = useMemo(() => event?.actions || [], [event?.actions]);

    const visibility = useMemo(() => {
        const detail = event?.details.find(({title}) => title === 'Aksiyon')
        return detail?.value === '-'
    }, [event?.details]);

    const onClickAction = useCallback((id) => {
        switch (id) {
            case EventActions.NoActionNeeded:
                const details = event?.details.slice() || [];
                const index = details.findIndex(({title}) => title === 'Aksiyon');
                if (index >= 0) {
                    details[index] = {...details[index], value: "Aksiyon Gerekmiyor"};
                    dispatch(updateEvent({...event, details} as any));
                }
        }
    }, [dispatch, actions, event]);

    return visibility ? (
        <Row gutter={10}>
            {actions.map((action) => (
                    <Col key={action.action_id} flex="auto">
                        <Button style={{width: "100%"}}
                                onClick={() => onClickAction(action.action_id)}>{action.title}</Button>
                    </Col>
                )
            )}
        </Row>
    ) : null;
}
