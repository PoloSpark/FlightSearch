import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AmadeusLocations } from "../types/names";
import { Datum, Itinerary } from "../types/types";
import Itineraries from "./itineraries";

export default function ResultItem(props: Datum) {
    const arr = props.itineraries;
    const first = arr[0];
    const last = arr[arr.length - 1];
    const firstS = first.segments[0];
    const lastS = last.segments[last.segments.length - 1];

    const iataDep = firstS.departure.iataCode;
    const iataArr = lastS.arrival.iataCode;

    const [dep, setDep] = useState<string>("");
    const [iarr, setIarr] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // React Router navigation hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dataDep, dataArr] = await Promise.all([
                    axios.get<AmadeusLocations>(`http://localhost:8080/amadeus/locations?subtype=AIRPORT&keyword=${iataDep}`),
                    axios.get<AmadeusLocations>(`http://localhost:8080/amadeus/locations?subtype=AIRPORT&keyword=${iataArr}`),
                ]);
                setDep(dataDep.data.data[0]?.name || "Unknown");
                setIarr(dataArr.data.data[0]?.name || "Unknown");
            } catch (err) {
                console.error(err);
                setError("Failed to load airport names");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
                dark: "#D1D1D1",
            },
        },
    });

    // Handler for navigating to another screen
    const handleClick = () => {
        navigate("/details", { state: { props } }); // Navigate to "/details" route with data
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: 200,
                    border: 1,
                    borderWidth: 1,
                    borderColor: "#000000",
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark", cursor: "pointer" },
                }}
                onClick={handleClick} // Attach navigation handler
            >
                <div>
                    {firstS.departure.at.toString()} ---- {lastS.arrival.at.toString()}
                </div>
                <div>
                    {loading ? "Loading..." : error || `${dep} (${iataDep}) ---- ${iarr} (${iataArr})`}
                </div>
                <div>
                    {props.travelerPricings[0].price.base} {props.price.currency} ---- {props.price.grandTotal} {props.price.currency}
                </div>
                <div>
                    {props.itineraries.map((itinerary, index) => (
                        <Itineraries key={index} {...(itinerary as Itinerary)} />
                    ))}
                </div>
            </Box>
        </ThemeProvider>
    );
}
