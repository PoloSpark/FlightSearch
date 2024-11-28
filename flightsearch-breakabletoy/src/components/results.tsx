import { Box, Button, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import { AmadeusResponse, Datum } from "../types/types";
import ResultItem from "./resultItem";

export default function Result(props: AmadeusResponse) {
    return (
        <div>
            {
                props.data.map((s, index) => (
                    <div className="flightsPage">
                        <ResultItem key={index} {...s as Datum} />
                    </div>
                ))
            }
        </div>
    )
}