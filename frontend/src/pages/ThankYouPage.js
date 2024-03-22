import { Box, Card, Stack, Typography } from "@mui/material";

//assets
import ManThinkingRafiki from '../assets/images/Man-thinking-rafiki.svg'

export default function ThankYouPage() {
    return (
        <Stack justifyContent={'center'} alignItems={'center'} >
            <Card variant="outlined" sx={{ minWidth: 800, mt: 4 }} >
                <Stack alignItems={'center'} justifyContent={'center'} spacing={1} sx={{ py: 4 }} >
                    <Stack alignItems={'center'} spacing={1} >
                        <Typography sx={{ fontSize: 32, fontWeight: 700 }} >Thank You</Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Your Enquiry has been Submitted</Typography>
                    </Stack>
                    <Box
                        component={'img'}
                        src={ManThinkingRafiki}
                        alt="Man Thinking Rafiki"
                        sx={{
                            width: 340,
                            height: 340,
                            objectFit: "contain"
                        }}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}  >we will get back to you as soon as possibel!</Typography>
                </Stack>
            </Card>
        </Stack>
    )
}