import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/search';
import Flights from './components/flights';
import Details from './components/details';

export default function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Search/>} />
                <Route path="/flights" element={<Flights/>} />
                <Route path="/details" element={<Details />} />
            </Routes>
        </Router>
    );
};
