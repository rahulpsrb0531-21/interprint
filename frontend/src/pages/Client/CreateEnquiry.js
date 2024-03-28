import { Button, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";


export default function CreateEnquiry() {
    const { user } = useSelector((state) => state.auth)
    console.log("user>>>>>>>>", user)
    return (
        <Stack spacing={2}
            sx={{
                width: "78vw",
                px: 5,
            }}
        >
            <Typography sx={{ fontSize: 32, fontWeight: 600 }} >Create Enquiry</Typography>
            <Stack spacing={2} >
                <TextField
                    multiline
                    rows={4}
                    sx={{
                        ".MuiInputBase-root": { borderRadius: '4px' },
                        '& > :not(style)': { m: 0 },
                        "& .MuiInputLabel-root": { fontSize: 15 },
                        width: "50%"
                    }}
                    label="Requirements*"
                />
                <Button variant="outlined"
                    sx={{ width: 160 }}
                >Submit</Button>
            </Stack>
        </Stack>
    )
}