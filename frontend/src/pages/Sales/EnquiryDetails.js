import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Iconify from "../../components/Iconify";
import prepressServices from "../../services/prepressServices";
import { useSnackbar } from "notistack";


export default function EnquiryDetails() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { state } = useLocation()
    console.log('State', state)

    async function createUps() {
        const data = {
            enquiry: state
        }
        const res = await prepressServices.createUps(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            navigate("/sales/enquiry/lists")
        } else {
            enqueueSnackbar(res?.data || "server error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    return (
        <Stack spacing={4} sx={{ width: "80vw", px: 4 }} >
            {/* company name  */}
            <Stack direction={'row'} justifyContent={'space-between'}
                sx={{ width: '100%' }}
            >
                <Stack direction={'row'} alignItems={"center"} spacing={1.6}
                    sx={{ borderBottom: "1px solid #eee", pb: 2 }}
                >
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Company Name :</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{state?.companyName}</Typography>
                </Stack>
                {/* <Box sx={{ textAlign: 'right', width: "100%" }} > */}
                {
                    state?.status === "Pending" ? (
                        <Button size="small"
                            variant="outlined"
                            sx={{
                                // width: 120,
                                height: "40px",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                // borderRadius: 8,
                                letterSpacing: 0.4,
                                textAlign: "right"
                            }}
                            // type="submit"
                            onClick={() => createUps()}
                        >
                            {/* create New Client */}
                            Sent to Pre press
                        </Button>

                    ) :
                        state?.status === "Sent to Prepress" ? (
                            <></>
                        )
                            : (
                                <Button size="small"
                                    variant="outlined"
                                    sx={{
                                        // width: 120,
                                        height: "40px",
                                        fontWeight: 400,
                                        textTransform: "uppercase",
                                        // borderRadius: 8,
                                        letterSpacing: 0.4,
                                        textAlign: "right"
                                    }}
                                    // type="submit"
                                    onClick={() => navigate('/sales/create/new/client', { state: state })}
                                >
                                    {/* create New Client */}
                                    Make Quotation
                                </Button>
                            )
                }
                {/* <Button size="small"
                    variant="outlined"
                    sx={{
                        // width: 120,
                        height: "40px",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        // borderRadius: 8,
                        letterSpacing: 0.4,
                        textAlign: "right"
                    }}
                    // type="submit"
                    onClick={() => navigate('/sales/create/new/client', { state: state })}
                >
                    {/* create New Client */}
                {/* Make Quotation
            </Button> */}
                {/* </Box> */}
            </Stack>
            {/* company details  */}
            <Stack spacing={1} sx={{ borderBottom: "1px solid #eee", pb: 2 }} >
                <Typography sx={{ fontSize: 18, fontWeight: 600, textTransform: "capitalize" }} >company details</Typography>
                {/* <Typography sx={{ fontSize: 14, fontWeight: 600 }} ></Typography> */}
                <Grid container rowGap={2} sx={{ width: 500 }} >
                    <Grid item xs={12}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >Street :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.
                                companyAddress?.street}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >City :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.
                                companyAddress?.city}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >Country :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.
                                companyAddress?.country}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >State :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.
                                companyAddress?.state}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >Zip :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.
                                companyAddress?.zip}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            {/* personal details  */}
            <Stack spacing={1} sx={{ width: '100%', borderBottom: "1px solid #eee", pb: 2 }}  >
                <Typography sx={{ fontSize: 18, fontWeight: 600 }} >Personal Details</Typography>
                <Grid container rowGap={4} sx={{ width: 600 }} >
                    <Grid item xs={6} >
                        <Stack direction={'row'} spacing={1.6}
                            alignItems={'center'} >
                            <Iconify icon={"ic:outline-email"}
                            // sx={{ width: 34, height: 34, bgcolor: "red" }}
                            />
                            <a href={`mailto:${state?.email}`} rel="noopener" target="_blank" style={{ fontSize: 14, fontWeight: 500, color: "black", letterSpacing: 0.4, textDecoration: "none" }} >
                                {state?.email}
                            </a>
                        </Stack>
                    </Grid>
                    <Grid item xs={6} >
                        <Stack direction={'row'} spacing={1.6} alignItems={'center'} >
                            <Iconify icon={"fluent:call-20-regular"} />
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.phone}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>

        </Stack >
    )
}