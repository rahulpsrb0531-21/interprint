import { Box, Button, Stack, Typography } from "@mui/material";


export default function ArtworkApproval() {
    return (
        <Stack spacing={2} >
            <Typography variant="TabMainTitle" >Updated Artwork</Typography>
            <Box
                sx={{
                    width: 900,
                    height: 600,
                    bgcolor: "#8FD0D0",
                    borderRadius: '4px'
                }}
            >
            </Box>
            <Stack direction={'row'} spacing={2} >
                <Button
                    disableElevation
                    type="submit"
                    size="small"
                    variant="outlined"
                    sx={{
                        width: 90,
                        height: "40px",
                        fontWeight: 400,
                        color: "green",
                        borderColor: "green",
                        // borderRadius: 8,
                        letterSpacing: 0.4,
                        textTransform: "uppercase"
                    }}
                >
                    Accept
                </Button>
                <Button
                    disableElevation
                    type="submit"
                    size="small"
                    variant="outlined"
                    sx={{
                        width: 90,
                        height: "40px",
                        fontWeight: 400,
                        color: "red",
                        borderColor: "red",
                        // borderRadius: 8,
                        letterSpacing: 0.4,
                        textTransform: "uppercase"
                    }}
                >
                    Decline
                </Button>
            </Stack>
        </Stack>
    )
}