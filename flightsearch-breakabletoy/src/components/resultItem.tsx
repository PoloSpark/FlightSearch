import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AmadeusLocations } from "../types/names";
import { Datum, Itinerary } from "../types/types";
import Itineraries from "./itineraries";

export interface resultItemProps {
    arrival: string
    departure: string,
    data: Datum
}

export default function ResultItem({arrival, departure, data}: resultItemProps) {

    const arr = data.itineraries;
    const first = arr[0];
    const last = arr[arr.length - 1];
    const firstS = first.segments[0];
    const lastS = last.segments[last.segments.length - 1];

    const iataDep = firstS.departure.iataCode;
    const iataArr = firstS.arrival.iataCode;

    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
                dark: "#D1D1D1",
            },
        },
    });
    
    const handleClick = () => {
        navigate("/details", { state: { data } });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: 150,
                    border: 1,
                    borderWidth: 1,
                    borderColor: "#000000",
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark", cursor: "pointer" },
                }}
                onClick={handleClick}
            >
                <div>
                    {firstS.departure.at.toString()} ---- {lastS.arrival.at.toString()}
                </div>
                <div>
                    {`${departure} (${iataDep}) - ${arrival} (${iataArr})`}
                </div>
                <div>
                    {data.travelerPricings[0].price.base} {data.price.currency} ---- {data.price.grandTotal} {data.price.currency}
                </div>
            </Box>
        </ThemeProvider>
    );
}
