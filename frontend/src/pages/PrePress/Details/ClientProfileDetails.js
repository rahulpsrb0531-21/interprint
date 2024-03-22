import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Iconify from "../../../components/Iconify";


export default function ClientProfileDetails() {
    return (
        <Stack>
            <Typography>Client Details</Typography>
            <Card variant="outlined"
                sx={{
                    width: 300,
                    height: 320,
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        height: 100,
                        bgcolor: 'blue'
                    }}
                />
                <Stack alignItems={'center'}
                    justifyContent={"center"}
                    sx={{
                        position: "absolute",
                        top: 50,
                        left: 90
                    }}
                    spacing={0.2}
                >
                    <Box
                        component={'img'}
                        src="/images/client-photo.jpg"
                        sx={{
                            width: 110,
                            height: 110,
                            borderRadius: "50%",
                            objectFit: 'cover'
                        }}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }} >John Doe</Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }} >Lorem Ipsum</Typography>
                </Stack>
                <Stack sx={{
                    position: 'absolute', bottom: 30,
                    width: "100%"
                }} spacing={1.4}  >
                    <Divider />
                    <Stack direction={'row'} alignItems={"center"}
                        sx={{ pl: 2 }} spacing={1}>
                        <Iconify icon={"material-symbols:call"}
                            sx={{ width: 20, height: 20 }}
                        />
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} >0987654321</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={"center"}
                        sx={{ pl: 2 }} spacing={1}>
                        <Iconify icon={"material-symbols:mail"}
                            sx={{ width: 20, height: 20 }}
                        />
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} >john@gmail.com</Typography>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    )
}