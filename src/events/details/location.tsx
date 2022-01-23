import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Typography} from "antd";
import {useSelector} from "react-redux";
import {selectSelectedEvent} from "../../store/events";
import {useMemo} from "react";
import {IEventLocation} from "../types";

function LocationMap({location}: { location: IEventLocation }) {
    const position = useMemo(() => ({lat: location.latitude, lng: location.longitude}), [location]);

    return <div style={{height: 400, overflow: 'hidden'}}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    </div>
}

export function LocationDetails() {
    const event = useSelector(selectSelectedEvent);

    return event?.location ? <LocationMap location={event?.location}/> :
        <Typography.Text>There is no map information.</Typography.Text>
}
