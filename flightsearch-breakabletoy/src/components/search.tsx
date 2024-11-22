import React, { useState } from "react";
import { FormControl, Input, InputLabel, Select, MenuItem, FormGroup } from '@mui/material';
import '../index.css'

export default function Search() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');


    return (
        <div>
            <h1 className="searchTitle">Flight Search</h1>
            <div className="searchPage">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
                    <InputLabel>Origin</InputLabel>
                    <Select
                        value={origin}
                        label="Departure Airport"
                    >
                        <MenuItem value={'JFK'}>JFK</MenuItem>
                        <MenuItem value={'LAX'}>LAX</MenuItem>
                        <MenuItem value={'ORD'}>ORD</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
                    <InputLabel >Destination</InputLabel>
                    <Select
                        value={destination}
                        label="Arrival Airport"
                    >
                        <MenuItem value={'JFK'}>JFK</MenuItem>
                        <MenuItem value={'LAX'}>LAX</MenuItem>
                        <MenuItem value={'ORD'}>ORD</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}