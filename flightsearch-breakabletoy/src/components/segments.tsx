import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Segment } from "../types/types";

export default function Segments(props: Segment) {
    
    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
                dark: "#D1D1D1",
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        height: 150,
                        border: 1,
                        borderWidth: 1,
                        borderColor: "#000000",
                        bgcolor: "primary.main",
                        "&:hover": { bgcolor: "primary.dark", cursor: "pointer" },
                    }}
                >
                    <div>
                        {`Segment ${props.id}`}
                    </div>

                </Box>
            </ThemeProvider>
        </div>
    )
}