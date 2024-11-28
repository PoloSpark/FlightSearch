import { Box, Button, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import { AmadeusResponse, Datum } from "../types/types";
import ResultItem from "./resultItem";

export interface resultProps {
    arrival: string,
    departure: string,
    data: AmadeusResponse
}

export default function Result({arrival, departure, data}: resultProps) {

    

    return (
        <div>

            {
                data.data.map((s, index) => (
                    <div className="flightsPage">
                        <ResultItem key={index} arrival={arrival} departure={departure} data={s} />
                    </div>
                ))
            }
        </div>
    )
}