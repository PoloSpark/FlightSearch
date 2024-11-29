import { useLocation, useNavigate } from "react-router-dom";
import { DatumPrice, Itinerary, Segment } from "../types/types";
import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import Segments from "./segments";
import Itineraries from "./itineraries";

export default function Details() {

    const location = useLocation();
    const navigate = useNavigate();

    const { data } = location.state || {};

    const itineraries: Itinerary[] = data.itineraries
    const price: DatumPrice = data.price

    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
                dark: "#D1D1D1",
            },
        },
    });

    const handleNavigation = () => {
        navigate('/');
    };

    return (
        <div className="flightsPage">
            <Button variant="outlined" onClick={handleNavigation}>Get Back to Search</Button>
            <div className="grid-container">
                <div>
                    {itineraries.map((s) => (
                        <Itineraries {...s as Itinerary} />
                    ))}
                </div>

                <div>
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                height: "100%",
                                border: 1,
                                borderWidth: 1,
                                borderColor: "#000000",
                                bgcolor: "primary.main",
                                "&:hover": { bgcolor: "primary.dark", cursor: "pointer" },
                                padding: "5%"
                            }}
                        >
                            <p>
                                Price Breakdown:
                            </p>

                            <p>
                                Base: {`${price.base} ${price.currency}`}
                            </p>

                            <p>
                                Fees:
                                
                                {price.fees.map((s) => (
                                    <div>
                                        {`${s.type}: ${s.amount} ${price.currency}`}
                                    </div>
                                ))}
                            </p>

                            <p>
                                Total: {`${price.total} ${price.currency}`}
                            </p>

                        </Box>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}