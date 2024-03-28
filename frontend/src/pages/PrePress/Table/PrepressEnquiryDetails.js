import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useLocation, useNavigate } from "react-router-dom"
import Iconify from "../../../components/Iconify"
import { useState } from "react"
import prepressServices from "../../../services/prepressServices"



export default function PrepressEnquiryDetails() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [upsValue, setUpsValue] = useState("")
    const { state } = useLocation()

    console.log("state>>>>>>>", state)

    async function updateUps() {
        const data = {
            id: state?.enquiry?._id,
            email: state?.enquiry?.email,
            ups: upsValue
        }
        const res = await prepressServices.updateUps(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            navigate("/pre-press/enquiry")
        } else {
            enqueueSnackbar(res?.data || "server error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }


    return (
        <Stack spacing={4} sx={{ width: "80vw", px: 4 }} >
            <Stack direction={'row'} justifyContent={'space-between'}
                sx={{ width: '100%' }}
            >
                <Stack direction={'row'} alignItems={"center"} spacing={1.6}
                    sx={{ borderBottom: "1px solid #eee", pb: 2 }}
                >
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Company Name :</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{state?.enquiry?.companyName}</Typography>
                </Stack>
            </Stack>

            {/* company details  */}
            <Stack spacing={1} sx={{ borderBottom: "1px solid #eee", pb: 2 }} >
                <Typography sx={{ fontSize: 18, fontWeight: 600, textTransform: "capitalize" }} >company details</Typography>
                {/* <Typography sx={{ fontSize: 14, fontWeight: 600 }} ></Typography> */}
                <Grid container rowGap={2} sx={{ width: 500 }} >
                    <Grid item xs={12}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >Street :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.enquiry?.
                                companyAddress?.street}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >City :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.enquiry?.
                                companyAddress?.city}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >Country :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.enquiry?.
                                companyAddress?.country}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >State :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.enquiry?.
                                companyAddress?.state}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction={'row'} spacing={1.6} alignItems={"center"} >
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >Zip :</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.enquiry?.
                                companyAddress?.zip}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            {/* personal details  */}
            <Stack spacing={1} sx={{ width: '100%', borderBottom: "1px solid #eee", pb: 2 }} >
                <Typography sx={{ fontSize: 18, fontWeight: 600 }} >Personal Details</Typography>
                <Grid container rowGap={4} sx={{ width: 600 }} >
                    <Grid item xs={6} >
                        <Stack direction={'row'} spacing={1.6}
                            alignItems={'center'} >
                            <Iconify icon={"ic:outline-email"}
                            // sx={{ width: 34, height: 34, bgcolor: "red" }}
                            />
                            <a href={`mailto:${state?.enquiry?.email}`} rel="noopener" target="_blank" style={{ fontSize: 14, fontWeight: 500, color: "black", letterSpacing: 0.4, textDecoration: "none" }} >
                                {state?.enquiry?.email}
                            </a>
                        </Stack>
                    </Grid>
                    <Grid item xs={6} >
                        <Stack direction={'row'} spacing={1.6} alignItems={'center'} >
                            <Iconify icon={"fluent:call-20-regular"} />
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }} >{state?.enquiry?.phone}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>

            {/* ups field */}
            <Stack spacing={1} direction={"row"} alignItems={'center'} sx={{ width: '100%', borderBottom: "1px solid #eee", pb: 2 }} >
                <TextField
                    sx={{
                        ".MuiInputBase-root": { borderRadius: '4px' },
                        '& > :not(style)': { m: 0 },
                        "& .MuiInputLabel-root": { fontSize: 15 },
                        // width: "47%"
                    }}
                    label="Enter Ups*"
                    onChange={(e) => setUpsValue(e.target.value)}
                />
                <Button variant="contained"
                    onClick={() => updateUps()}
                >Submit</Button>
            </Stack>

        </Stack>
    )
}