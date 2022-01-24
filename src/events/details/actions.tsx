import {useDispatch, useSelector} from "react-redux";
import {eventsSlice, selectSelectedEvent} from "../../store/events";
import {Button, Col, Input, Modal, Row, Space, Steps, Typography} from "antd";
import {useCallback, useMemo, useState} from "react";
import {EventActions} from "../types";
import {
    Loader,
    StyledAction,
    StyledActionButtons,
    StyledAlertMessage,
    StyledHStack,
    StyledResolutionDetail
} from "./styles";
import Icon from "@ant-design/icons";
import {Action, ErrorMessage, Message, SuccessMessage, TakeActionModelProps} from "./types";

const {updateAction} = eventsSlice.actions;

const actions: Action[] = [{
    id: 1,
    title: "Mark as Resolved",
    description: "Mark this event as resolved and enter the details of the resolution."
}, {
    id: 2,
    title: "Change Asset",
    description: "Change the asset with another one."
},]

function TakeActionModelContent() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message>();
    const [selectedAction, setSelectedAction] = useState<Action>();
    const [resolutionDetail, setResolutionDetail] = useState<string>();
    const dispatch = useDispatch();

    const goNextStep = useCallback(() => setCurrentStep(state => state + 1), [])
    const goPrevStep = useCallback(() => setCurrentStep(state => state - 1), [])

    const handleTakeAction = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const alertMessage = resolutionDetail ? new SuccessMessage() : new ErrorMessage();
            setMessage(alertMessage);
            setLoading(false);

            if (alertMessage instanceof SuccessMessage) {
                dispatch(updateAction({value: selectedAction?.title} as any));
            }
        }, 1000)
    }, [resolutionDetail, dispatch, selectedAction]);

    if (loading) return <Loader/>

    if (message) {
        return (
            <StyledAlertMessage type={message.type}>
                <Icon className="alert-message--icon" component={message.icon}/>
                <Typography.Title level={2} className="alert-message--title">{message.title}</Typography.Title>
                <Typography.Text type="secondary">{message.description}</Typography.Text>
            </StyledAlertMessage>
        )
    }

    return (
        <>
            <Steps current={currentStep}>
                <Steps.Step title="Select Action"/>
                <Steps.Step title="Take Action"/>
            </Steps>
            <StyledHStack>
                {currentStep === 0 ? (
                    <>
                        {actions.map(action => (
                                <StyledAction className={selectedAction?.id === action.id ? 'selected' : undefined}
                                              key={action.id}
                                              onClick={() => setSelectedAction(action)}>
                                    <Typography.Title level={5}>{action.title}</Typography.Title>
                                    <Typography.Text type="secondary">{action.description}</Typography.Text>
                                </StyledAction>
                            )
                        )}
                    </>
                ) : (
                    <>
                        <Typography.Title level={5}>{selectedAction?.title}</Typography.Title>
                        <Typography.Text type="secondary">{selectedAction?.description}</Typography.Text>
                        <StyledResolutionDetail>
                            <Typography.Text strong>Resolution Detail*</Typography.Text>
                            <Input.TextArea autoSize={{minRows: 3, maxRows: 5}} showCount maxLength={300}
                                            placeholder="Enter resolution detail…"
                                            onChange={event => setResolutionDetail(event.target.value)}/>
                        </StyledResolutionDetail>
                    </>
                )}
                <StyledActionButtons>
                    <Space>
                        {currentStep === 1 && (<>
                            <Button onClick={goPrevStep}>Back</Button>
                            <Button type="primary" onClick={handleTakeAction}>Take Action</Button>
                        </>)}
                        {currentStep === 0 && (
                            <Button type="primary" disabled={!selectedAction} onClick={goNextStep}>Next</Button>)}
                    </Space>
                </StyledActionButtons>
            </StyledHStack>
        </>
    )
}

function TakeActionModel({visible, onCancel}: TakeActionModelProps) {
    return (
        <Modal visible={visible} bodyStyle={{padding: "50px 40px"}} onCancel={onCancel} footer={null} destroyOnClose>
            <TakeActionModelContent/>
        </Modal>
    )
}

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

    return visibility ? (
        <Row gutter={10}>
            <TakeActionModel visible={visible} onCancel={() => setVisible(false)}/>
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
