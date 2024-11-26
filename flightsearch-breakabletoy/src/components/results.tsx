import { Box, Button, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";

export default function Result() {
    return (
        <div>
            <ThemeProvider
                theme={{
                    palette: {
                        primary: {
                            main: '#FFFFFF',
                            dark: '#D1D1D1',
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        height: 150,
                        border: 1,
                        borderWidth: 1,
                        borderColor: '#000000',
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >


                </Box>
            </ThemeProvider>
        </div>
    )
}