import { Box, Button, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";
import Iconify from "../../../components/Iconify";

export default function ArtWork() {
    return (
        <Stack direction={'row'} spacing={2} >
            <Box
                sx={{ pt: 1 }}
            >
                <Typography variant="TabMainTitle" >Current Artwork</Typography>
                <Box sx={{
                    width: 540,
                    height: 400,
                    bgcolor: "#8FD0D0",
                    borderRadius: '4px',
                    mt: 6
                }}>
                </Box>
            </Box>
            <Stack
                sx={{ pt: 2.6 }}
                alignItems={'center'}
                spacing={2}
            >
                <Typography variant="TabMainTitle" sx={{ textAlign: "left", width: '100%', pb: 3 }} >Upload New Artwork</Typography>
                <Stack sx={{
                    width: 480,
                    height: 200,
                    // bgcolor: "#8FD0D0",
                    border: "1px dashed #8FD0D0",
                    borderRadius: '4px',
                }}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Stack direction={'row'} alignItems={'center'} spacing={1} >
                        <Iconify icon={"et:upload"} />
                        <Typography>Drag an artwork here or browse to upload it.</Typography>
                    </Stack>
                </Stack>
                <Typography>Or</Typography>
                {/* <FormControl>
                    <FormLabel>Paste the link below to upload an artwork.</FormLabel>
                    <Text
                </FormControl> */}
                <TextField type="text"
                    label="Paste the link below to upload an artwork. "
                    sx={{
                        width: '100%',
                        ".MuiInputBase-root": {
                            borderRadius: '4px',
                            //  height: "40px" 
                        },
                        '& > :not(style)': { m: 0 },
                        "& .MuiInputLabel-root": { fontSize: 15 },
                    }}
                />
                <Button
                    disableElevation
                    type="submit"
                    // disabled={isSubmitting}
                    size="small"
                    // variant="contained"
                    variant="outlined"
                    sx={{
                        // width: 320,
                        height: "50px",
                        fontWeight: 400,
                        // borderRadius: 8,
                        letterSpacing: 0.4,
                        textTransform: "uppercase"
                    }}
                >
                    Upload
                </Button>
            </Stack>
        </Stack>
    )
}