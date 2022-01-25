import {useDispatch, useSelector} from "react-redux";
import {eventsSlice, selectSelectedEvent} from "../../../store/events";
import {Tabs, Typography, Grid, Drawer} from "antd";
import {AdditionalInfo, Media, LocationDetails} from "./tabs";
import {StyledContainer, StyledContent, StyledContentWrapper, StyledWrapper} from "./styles";
import {Actions} from "./actions";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

const {TabPane} = Tabs;

const {selectEvent} = eventsSlice.actions;

const {useBreakpoint} = Grid;

function EventDetailsContent() {
    return (
        <StyledContent>
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
        </StyledContent>
    )
}

export function EventDetails() {
    const params = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const event = useSelector(selectSelectedEvent);
    const breakpoints = useBreakpoint();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            dispatch(selectEvent(+params.id))
        }
    }, [params])

    if (!event) return null;

    if (!breakpoints.xl) {
        return (
            <Drawer title="Event Details" placement="right" visible={!!params.id} onClose={() => navigate("/events")}>
                <StyledContainer>
                    <EventDetailsContent/>
                </StyledContainer>
            </Drawer>
        )
    }

    return (
        <StyledWrapper>
            <StyledContentWrapper>
                <Typography.Title level={2}>Event Details</Typography.Title>
                <EventDetailsContent/>
            </StyledContentWrapper>
        </StyledWrapper>
    )
}
