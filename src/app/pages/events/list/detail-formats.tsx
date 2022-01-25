import moment from "moment";
import React from "react";
import {DetailFormatTypes} from "../types";

function StringDetailFormat({value}: { value: string }) {
    return <span>{value}</span>
}

function DateDetailFormat({value}: { value: string }) {
    return <span>{moment(value).format("DD.MM.YYYY HH:mm")}</span>
}

const detailFormatsMap = {
    [DetailFormatTypes.String]: StringDetailFormat,
    [DetailFormatTypes.Date]: DateDetailFormat,
    [DetailFormatTypes.IncidentType]: StringDetailFormat,
    [DetailFormatTypes.Vehicle]: StringDetailFormat,
}

export function Detail({format, value}: { format: DetailFormatTypes, value: string }) {
    return React.createElement(detailFormatsMap[format], {value})
}
