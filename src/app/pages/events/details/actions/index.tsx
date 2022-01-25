import {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {eventsSlice, selectSelectedEvent} from "../../../../store/events";
import {EventActions} from "../../types";
import {StyledRow} from "../styles";
import {Button} from "antd";
import {TakeActionModal} from "./take-action-modal";

const {updateAction} = eventsSlice.actions;

export function Actions() {
    const [visible, setVisible] = useState(false);
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
                dispatch(updateAction({eventId: event?.id, value: "Aksiyon Gerekmiyor"} as any));
                break;
            case EventActions.TakeAction:
                setVisible(true)
        }
    }, [dispatch, actions, event]);

    return (
        <>
            <TakeActionModal visible={visible} onCancel={() => setVisible(false)}/>
            {visibility ? (
                <StyledRow>
                    {actions.map(
                        (action) => (
                            <Button key={action.action_id}
                                    type={action.action_id === EventActions.TakeAction ? 'primary' : undefined}
                                    onClick={() => onClickAction(action.action_id)}>{action.title}</Button>
                        )
                    )}
                </StyledRow>
            ) : null}
        </>
    );
}
