import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { AmadeusResponse } from "../types/types";
import Result from "./results";



export default function Flights() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AmadeusResponse>();
    const location = useLocation();
    const navigate = useNavigate();

    /*
    const [dep, setDep] = useState<string>("");
    const [iarr, setIarr] = useState<string>("");*/

    const { origin, destination, currency, departure, returnal, adults, nonstop } = location.state || {};

    const handleNavigation = () => {
        navigate('/');
    };

    const fetchData = async () => {
        try {
            const data = (await axios.get<AmadeusResponse>('http://localhost:8080/amadeus/flights?origin=' + origin + '&destination=' + destination + '&departureDate=' + departure + '&returnDate=' + returnal + '&nonStop=' + nonstop + '&adults=' + adults + '&currencyCode=' + currency)).data;
            setData(data)

            /*
            const [dataDep, dataArr] = await Promise.all([
                axios.get<AmadeusLocations>(`http://localhost:8080/amadeus/locations?subtype=AIRPORT&keyword=${origin}`),
                axios.get<AmadeusLocations>(`http://localhost:8080/amadeus/locations?subtype=AIRPORT&keyword=${destination}`),
            ]);

            setDep(dataDep.data.data[0]?.name || "Unknown");
            setIarr(dataArr.data.data[0]?.name || "Unknown");

            */
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flightsPage">
            <Button variant="outlined" onClick={handleNavigation}>Get Back to Search</Button>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <p style={{ marginRight: '20px' }}><strong>From:</strong> {origin}</p>
                <p style={{ marginRight: '20px' }}><strong>To:</strong> {destination}</p>
                <p style={{ marginRight: '20px' }}><strong>Currency:</strong> {currency}</p>
                <p style={{ marginRight: '20px' }}><strong>Departure Date:</strong> {departure}</p>
                <p style={{ marginRight: '20px' }}><strong>Return Date:</strong> {returnal}</p>
                <p style={{ marginRight: '20px' }}><strong>Number of Adults:</strong> {adults}</p>
                <p style={{ marginRight: '20px' }}><strong>Non-stop:</strong> {nonstop ? 'Yes' : 'No'}</p>
            </div>

            <div className="flightsPage">
                <Result {...data as AmadeusResponse}/>
            </div>

        </div>
    );
};
