import { Box, Typography } from "@mui/material";
import Tasks from "./components/Tasks";

function App() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                height: "100%",
                flexDirection: "column",
                mx: "2rem",
            }}
        >
            <Typography variant="h4" sx={{ textAlign: "center" }}>
                Task Management
            </Typography>
            <Tasks />
        </Box>
    );
}

export default App;
