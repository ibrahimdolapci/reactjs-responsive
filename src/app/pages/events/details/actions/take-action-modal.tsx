import {Action, TakeActionModelProps} from "../types";
import {useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {Loader, StyledAction, StyledActionButtons, StyledHStack, StyledResolutionDetail} from "../styles";
import {Button, Input, Modal, Space, Steps, Typography} from "antd";
import {eventsSlice} from "../../../../store/events";
import {AlertMessage, MessageTypes} from "../../../../components/alert-message";

const actions: Action[] = [{
    id: 1,
    title: "Mark as Resolved",
    description: "Mark this event as resolved and enter the details of the resolution."
}, {
    id: 2,
    title: "Change Asset",
    description: "Change the asset with another one."
}];

const {updateAction} = eventsSlice.actions;

function TakeActionModelContent() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState<MessageTypes>();
    const [selectedAction, setSelectedAction] = useState<Action>();
    const [resolutionDetail, setResolutionDetail] = useState<string>();
    const dispatch = useDispatch();

    const goNextStep = useCallback(() => setCurrentStep(state => state + 1), [])
    const goPrevStep = useCallback(() => setCurrentStep(state => state - 1), [])

    const handleTakeAction = useCallback(() => {
        setLoading(true);

        setTimeout(() => {
            const type = resolutionDetail ? MessageTypes.Success : MessageTypes.Error;
            setMessageType(type);
            setLoading(false);

            if (type === MessageTypes.Success) {
                dispatch(updateAction({value: selectedAction?.title} as any));
            }
        }, 1000)
    }, [resolutionDetail, dispatch, selectedAction]);

    const selectActionStepContent = useMemo(() => (
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
    ), [selectedAction?.id]);

    const takeActionStepContent = useMemo(() => (
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
    ), [selectedAction]);

    if (loading) return <Loader/>

    if (messageType) {
        return <AlertMessage type={messageType}/>
    }

    return (
        <>
            <Steps current={currentStep}>
                <Steps.Step title="Select Action"/>
                <Steps.Step title="Take Action"/>
            </Steps>
            <StyledHStack>
                {currentStep === 0 ? selectActionStepContent : takeActionStepContent}
                <StyledActionButtons>
                    <Space>
                        {currentStep === 1 && (
                            <>
                                <Button onClick={goPrevStep}>Back</Button>
                                <Button type="primary" onClick={handleTakeAction}>Take Action</Button>
                            </>
                        )}
                        {currentStep === 0 && (
                            <Button type="primary" disabled={!selectedAction} onClick={goNextStep}>Next</Button>)}
                    </Space>
                </StyledActionButtons>
            </StyledHStack>
        </>
    )
}

export function TakeActionModal({visible, onCancel}: TakeActionModelProps) {
    return (
        <Modal width={700} visible={visible} bodyStyle={{padding: "50px 40px"}} onCancel={onCancel} footer={null}
               destroyOnClose>
            <TakeActionModelContent/>
        </Modal>
    )
}
