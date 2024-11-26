import React, { useState } from "react";
import { FormControl, Input, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Button, SelectChangeEvent } from '@mui/material';
import '../index.css'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [currency, setCurrency] = useState('');
    const [departure, setDeparture] = useState<Dayjs | null>(dayjs('2024-11-25'));
    const [returnal, setReturnal] = useState<Dayjs | null>(dayjs('2024-11-25'));
    const navigate = useNavigate();

    const handleNavigation = () => {
        
        navigate('/flights');
    };

    // Form Setters
    const handleOrigin = (event: SelectChangeEvent) => {
        setOrigin(event.target.value as string);
    };
    const handleDestination = (event: SelectChangeEvent) => {
        setDestination(event.target.value as string);
    };
    const handleCurrency = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    };

    return (
        <div>
            <h1 className="searchTitle">Flight Search</h1>

            <div className="searchPage">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 480 }}>
                    <InputLabel>Departure Airport</InputLabel>
                    <Select
                        value={origin}
                        label="Departure Airport"
                        onChange={handleOrigin}
                    >
                        <MenuItem value={'JFK'}>JFK</MenuItem>
                        <MenuItem value={'LAX'}>LAX</MenuItem>
                        <MenuItem value={'ORD'}>ORD</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="searchPage">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 480 }}>
                    <InputLabel >Arrival Airport</InputLabel>
                    <Select
                        value={destination}
                        label="Arrival Airport"
                        onChange={handleDestination}
                    >
                        <MenuItem value={'JFK'}>JFK</MenuItem>
                        <MenuItem value={'LAX'}>LAX</MenuItem>
                        <MenuItem value={'ORD'}>ORD</MenuItem>
                    </Select>
                </FormControl>
            </div>


            <div className="searchPage">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Departure date"
                        value={departure}
                        onChange={(newValue) => setDeparture(newValue)}
                        sx={{ m: 1, minWidth: 480 }}
                    />
                </LocalizationProvider>
            </div>

            <div className="searchPage">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Return date"
                        value={returnal}
                        onChange={(newValue) => setReturnal(newValue)}
                        sx={{ m: 1, minWidth: 480 }}
                    />
                </LocalizationProvider>
            </div>

            <div className="searchPage">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 480 }}>
                    <InputLabel >Currency</InputLabel>
                    <Select
                        value={currency}
                        label="Currency"
                        onChange={handleCurrency}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'MXN'}>MXN</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="searchPage">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 360 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Number of Adults"
                        defaultValue="1"
                        sx={{ m: 1, minWidth: 240 }}
                    />
                </FormControl>

                <FormControl variant="filled" sx={{ m: 1 }}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Non-stop" />
                </FormControl>
            </div>

            <div className="searchPage">
                <Button variant="contained" onClick={handleNavigation}>Search</Button>
            </div>
        </div>
    );
}