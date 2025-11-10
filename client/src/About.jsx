import { Typography, Card, CardContent, Stack } from "@mui/material";

export default function About() {
    return(
        <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main", mb: 2 }}>
                About Us
            </Typography>

            <Card sx={{ maxWidth: 800, p: 2 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
                        Incident Management System
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                        Welcome to our Incident Management Application. This system helps you manage 
                        and track incidents efficiently with a user-friendly interface.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                        You can create, update, and delete incidents with ease. The application 
                        provides a clean and modern interface for managing your incident records.
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: 800, p: 2 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                        Features
                    </Typography>
                    <Stack spacing={1}>
                        <Typography variant="body2">• Create new incidents</Typography>
                        <Typography variant="body2">• Edit existing incidents</Typography>
                        <Typography variant="body2">• Delete incidents</Typography>
                        <Typography variant="body2">• View all incidents in a organized grid</Typography>
                        <Typography variant="body2">• Dark mode support</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    )
}