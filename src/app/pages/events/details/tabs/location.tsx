import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {Typography} from "antd";
import {useSelector} from "react-redux";
import {selectSelectedEvent} from "../../../../store/events";
import {useMemo} from "react";
import {IEventLocation} from "../../types";
import styled from "styled-components";
import MarkerPin from '../../../../images/pin.svg';
import L from 'leaflet';

const StyledMapContainer = styled(MapContainer)`
  height: 400px;
`;
const MarkerPinIcon = L.icon({
    iconUrl: MarkerPin,
    iconRetinaUrl: MarkerPin,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
});

function LocationMap({location}: { location: IEventLocation }) {
    const position = useMemo(() => ({lat: location.latitude, lng: location.longitude}), [location]);

    return (
        <StyledMapContainer style={{height: 400}} center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={MarkerPinIcon}/>
        </StyledMapContainer>
    )
}

export function LocationDetails() {
    const event = useSelector(selectSelectedEvent);

    return event?.location ? <LocationMap location={event?.location}/> :
        <Typography.Text>There is no map information.</Typography.Text>
}
