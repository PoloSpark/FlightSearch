import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, Button, TextField, FormControlLabel, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        currency: '',
        departure: dayjs(),
        returnal: dayjs().add(1, 'day'),
        adults: 1,
        nonstop: true,
    });

    const handleFormChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNavigation = () => {
        const { origin, destination, currency, departure, returnal, adults, nonstop } = formData;

        const formattedDeparture = departure.format('YYYY-MM-DD');
        const formattedReturnal = returnal.format('YYYY-MM-DD');

        if (!origin || !destination || !formattedDeparture || !formattedReturnal) {
            alert("Please fill in all required fields!");
            return;
        }

        navigate('/flights', { state: { origin, destination, currency, departure: formattedDeparture, returnal: formattedReturnal, adults, nonstop } });
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <h1>Flight Search</h1>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Departure Airport</InputLabel>
                <Select
                    value={formData.origin}
                    onChange={(e) => handleFormChange('origin', e.target.value)}
                >
                    <MenuItem value="JFK">JFK</MenuItem>
                    <MenuItem value="LAX">LAX</MenuItem>
                    <MenuItem value="ORD">ORD</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Arrival Airport</InputLabel>
                <Select
                    value={formData.destination}
                    onChange={(e) => handleFormChange('destination', e.target.value)}
                >
                    <MenuItem value="JFK">JFK</MenuItem>
                    <MenuItem value="LAX">LAX</MenuItem>
                    <MenuItem value="ORD">ORD</MenuItem>
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Departure Date"
                    value={formData.departure}
                    onChange={(newValue) => handleFormChange('departure', newValue)}
                    sx={{ mb: 2, width: '100%' }}
                />
                <DatePicker
                    label="Return Date"
                    value={formData.returnal}
                    onChange={(newValue) => {
                        if (newValue?.isBefore(formData.departure)) {
                            alert("Return date cannot be before departure date!");
                            return;
                        }
                        handleFormChange('returnal', newValue);
                    }}
                    sx={{ mb: 2, width: '100%' }}
                />
            </LocalizationProvider>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Currency</InputLabel>
                <Select
                    value={formData.currency}
                    onChange={(e) => handleFormChange('currency', e.target.value)}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="MXN">MXN</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Number of Adults"
                type="number"
                value={formData.adults}
                onChange={(e) => handleFormChange('adults', parseInt(e.target.value, 10) || 1)}
                inputProps={{ min: 1 }}
                fullWidth
                sx={{ mb: 2 }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.nonstop}
                        onChange={(e) => handleFormChange('nonstop', e.target.checked)}
                    />
                }
                label="Non-stop"
                sx={{ mb: 2 }}
            />

            <Button variant="contained" fullWidth onClick={handleNavigation}>
                Search
            </Button>
        </Box>
    );
}
