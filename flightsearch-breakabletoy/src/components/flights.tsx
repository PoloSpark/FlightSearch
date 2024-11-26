import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Datum, Itinerary, Segment, Types } from "../types/types";
import Result from "./results";



export default function Flights() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Datum[]>();
    const [itinerary, setItinerary] = useState<Itinerary[]>();

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/');
    };

    const fetchData = async () => {
        try {
            const response = (await axios.get<Types>('http://localhost:8080/amadeus/flights?origin=JFK&destination=LAX&departureDate=2025-11-01&adults=1')).data;
            
            setData(response.data);
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

            <div className="flightsPage">
                {
                    data?.map((item) => (
                        <div key={item.id}>
                            
                            <Result/>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};
