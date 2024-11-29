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
    airline: string,
    data: Datum
}

export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

export default function ResultItem({ arrival, departure, airline, data }: resultItemProps) {

    const firstI = data.itineraries[0];
    const firstlen = firstI.segments.length - 1;

    const depDate = firstI.segments[0].departure.at.toString();
    const arrDate = firstI.segments[firstlen].arrival.at.toString();

    const depIATA = firstI.segments[0].departure.iataCode;
    const arrIATA = firstI.segments[firstlen].arrival.iataCode


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

    const fetchData = () => {
        try {

        } catch (err) {
            console.log(err)
        }
    }

    function formatDuration(input: string): string {
        const hoursMatch = input.match(/(\d+)H/);
        const minutesMatch = input.match(/(\d+)M/);

        const hours = hoursMatch ? `${hoursMatch[1]}h` : '';
        const minutes = minutesMatch ? `${minutesMatch[1]}m` : '';

        return [hours, minutes].filter(Boolean).join(' ');
    }

    

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
                <div className="flex">
                    <div className="flex-item">
                        <div className="flex-item">
                            {`${formatDate(depDate)}  -  ${formatDate(arrDate)}`}
                        </div>
                        <div className="flex-item">
                            {`${departure} (${depIATA}) - ${arrival} (${arrIATA})`}
                        </div>
                        <div className="flex-item">
                            {`${airline} (${data.validatingAirlineCodes[0]})`}
                        </div>
                    </div>


                    <div>
                        <div>
                            {formatDuration(firstI.duration)}
                        </div>
                        <div>
                            {data.itineraries.length - 1 === 0
                                ? "Non Stop"
                                : data.itineraries.length - 1 === 1
                                    ? "1 stop"
                                    : `${data.itineraries.length - 1} stops`}
                        </div>

                    </div>

                    <div className="flex-item">
                        <div>
                            $ {data.price.grandTotal} {data.price.currency}
                        </div>
                        <div className="flex-item">
                            Total
                        </div>
                        <div >
                            $ {data.travelerPricings[0].price.base} {data.price.currency}
                        </div>
                        <div className="flex-item">
                            per Traveler
                        </div>
                    </div>
                </div>
            </Box>
        </ThemeProvider>
    );
}
