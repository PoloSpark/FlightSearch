import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Segment } from "../types/types";
import { formatDate } from "./resultItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { AmadeusLocations } from "../types/names";
import { AmadeusAirlines } from "../types/airlines";

export default function Segments(props: Segment) {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [dep, setDep] = useState<string>("");
    const [arr, setArr] = useState<string>("");
    const [airline, setAirline] = useState("");

    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
                dark: "#D1D1D1",
            },
        },
    });

    const fetchData = async () => {
        try {

            const [dataDep, dataArr] = await Promise.all([
                axios.get<AmadeusLocations>(`http://localhost:8080/amadeus/locations?subtype=AIRPORT&keyword=${props.departure.iataCode}`),
                axios.get<AmadeusLocations>(`http://localhost:8080/amadeus/locations?subtype=AIRPORT&keyword=${props.arrival.iataCode}`),
            ]);


            setDep(dataDep.data.data[0]?.name || "Unknown");
            setArr(dataArr.data.data[0]?.name || "Unknown");

            const dataAirline = (await axios.get<AmadeusAirlines>(`http://localhost:8080/amadeus/airlines?airlineCodes=${props.carrierCode}`)).data;

            setAirline(dataAirline.data[0]?.businessName || "Unknown");

            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        height: 250,
                        border: 1,
                        borderWidth: 1,
                        borderColor: "#000000",
                        bgcolor: "primary.main",
                        "&:hover": { bgcolor: "primary.dark", cursor: "pointer" },
                    }}
                >
                    <div>
                        <div className="flex-item">
                            {`Segment`}
                        </div>

                        <div className="flex-item">
                            {formatDate(props.departure.at.toString())}  -  {formatDate(props.arrival.at.toString())}
                        </div>

                        <div className="flex-item">
                            {`${dep} (${props.departure.iataCode}) - ${arr} (${props.arrival.iataCode})`}
                        </div>

                        <div className="flex-item">
                            {`${airline} (${props.carrierCode})`}
                        </div>
                    </div>
                </Box>
            </ThemeProvider>
        </div>
    )
}


