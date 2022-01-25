import {EventMediaTypes} from "../../types";
import {useSelector} from "react-redux";
import {selectSelectedEvent} from "../../../../store/events";
import {Image, Typography} from "antd";
import {StyledCenter} from "../styles";

export function Media() {
    const event = useSelector(selectSelectedEvent);

    return (
        <StyledCenter>
            <Image.PreviewGroup>
                {!event?.media?.length && <Typography.Text>No Media Content</Typography.Text>}
                {event?.media?.map(({type, url}) => type === EventMediaTypes.Image ? <Image src={url}/> : (
                    <audio controls>
                        <source src={url} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                ))}
            </Image.PreviewGroup>
        </StyledCenter>
    )
}
