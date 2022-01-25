import {Outlet} from "react-router-dom";
import React from "react";
import {EventList} from "./list";
import {StyledLayout, StyledWrapper} from "./styles";

export function Events() {
    return (
        <StyledLayout>
            <StyledWrapper>
                <EventList/>
                <Outlet/>
            </StyledWrapper>
        </StyledLayout>
    )
}
