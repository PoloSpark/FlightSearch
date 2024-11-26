import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/search';
import Flights from './components/flights';

export default function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Search/>} />
                <Route path="/flights" element={<Flights/>} />
            </Routes>
        </Router>
    );
};
