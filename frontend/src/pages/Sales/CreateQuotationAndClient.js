import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { useSnackbar } from "notistack";
// material
import { alpha } from '@mui/material/styles'
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useLocation, useNavigate } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import Iconify from "../../components/Iconify";
import salesServices from "../../services/salesServices";
import { generatePassword } from "../../utils/function";

export default function CreateQuotationAndClient() {
    const navigate = useNavigate()
    const { state } = useLocation()
    // console.log('state', state)

    const [selectedDate, setSelectedDate] = useState(null);

    const { enqueueSnackbar } = useSnackbar()
    const [showPassword, setShowPassword] = useState(false)

    const candidateProfileSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required"),
        phone: Yup.number().required("Phone is required"),
        companyName: Yup.string().required("Company name is required"),
        street: Yup.string().required("Street is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zip: Yup.string().required("Zipcode is required"),
        country: Yup.string().required("Country is required"),
        requirements: Yup.string().required("Requirements is required"),
        // Quotation data 
        password: Yup.string().required("Password is required"),
        note: Yup.string().required("Note is required"),
        date: Yup.string(),
        amount: Yup.number().required("Amount is required"),

    })

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyName: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            requirements: "",
            password: "",
            amount: "",
            date: "",
            note: ""
        },
        validationSchema: candidateProfileSchema,
        onSubmit: (v) => {
            const data = {
                enquiry: {
                    firstName: v?.firstName,
                    lastName: v?.lastName,
                    phone: v?.phone,
                    companyName: v?.companyName,
                    companyAddress: {
                        street: v?.street,
                        city: v?.city,
                        state: v?.state,
                        zip: v?.zip,
                        country: v?.country
                    },
                    requirements: v?.requirements,
                    email: v?.email,
                },
                password: v?.password,
                amount: v?.amount,
                date: selectedDate,
                note: v?.note

            }
            // console.log(data)
            createQuotation(data)
        }
    })


    async function createQuotation(data) {
        const res = await salesServices.createQuotationWithClient(data)
        console.log("res>>>>>>>>", res)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            resetForm()
            navigate("/sales/quotation/lists")
        } else {
            enqueueSnackbar(res?.data || "server error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    const {
        errors,
        touched,
        values,
        handleSubmit,
        getFieldProps,
        setFieldValue,
        isSubmitting,
        setSubmitting,
        resetForm
    } = formik

    useEffect(() => {
        if (state) {
            setFieldValue("firstName", state?.firstName)
            setFieldValue("lastName", state?.lastName)
            setFieldValue("phone", state?.phone)
            setFieldValue("companyName", state?.companyName)
            setFieldValue("street", state?.companyAddress?.street)
            setFieldValue("city", state?.companyAddress?.city)
            setFieldValue("zip", state?.companyAddress?.zip)
            setFieldValue("state", state?.companyAddress?.state)
            setFieldValue("country", state?.companyAddress?.country)
            setFieldValue("requirements", state?.requirements)
            setFieldValue("email", state?.email)
            // setSelectedDate(dayjs(state?.created_at))
        }
    }, [])


    const onKeyDown = (e) => {
        e.preventDefault();
    }

    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack
                    // alignItems={"center"} 
                    // justifyContent={"center"}
                    sx={{
                        // bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                        // border: "1px solid #eefe",
                        // height: '100%',
                        width: "78vw",
                        px: 5,
                        // mx: 5
                    }}
                >
                    <Stack spacing={2.8}
                        sx={{
                            bgcolor: 'rgb(255, 255, 255)',
                            // p: 4,
                            // border: '1px solid #e0e0e0',
                            //  borderRadius: "4px",
                            width: "80%"
                        }}
                    >
                        <Typography
                            sx={{ fontSize: 32, fontWeight: 600 }}
                        >Create Quotation</Typography>
                        <Typography
                            sx={{ fontSize: 20, fontWeight: 600 }}
                        >Enquiry Details</Typography>
                        <Stack spacing={2} >
                            {/* firstName and LastName  */}
                            <Stack direction={'row'} spacing={4}  >
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": {
                                            borderRadius: '4px',
                                        },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("firstName")}
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    label="First Name*"
                                />
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("lastName")}
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    label="Last Name*"
                                />
                            </Stack>
                            {/* email and phone   */}
                            <Stack direction={'row'} spacing={4}
                            // sx={{ width: '80%' }}
                            >
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("phone")}
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    label="Phone*"
                                />
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("companyName")}
                                    error={Boolean(touched.companyName && errors.companyName)}
                                    helperText={touched.companyName && errors.companyName}
                                    label="Company Name*"
                                />

                            </Stack>

                            {/* street address  */}
                            <TextField
                                multiline={true}
                                rows={3}
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                    width: "100%"
                                }}
                                {...getFieldProps("street")}
                                error={Boolean(touched.street && errors.street)}
                                helperText={touched.street && errors.street}
                                label="Street Address*"
                            />
                            {/* city and zip  */}
                            <Stack direction={'row'} spacing={4}  >
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": {
                                            borderRadius: '4px',
                                        },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("city")}
                                    error={Boolean(touched.city && errors.city)}
                                    helperText={touched.city && errors.city}
                                    label="City*"
                                />
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("zip")}
                                    error={Boolean(touched.zip && errors.zip)}
                                    helperText={touched.zip && errors.zip}
                                    label="Zip code*"
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={4} >
                                {/* state  */}
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("state")}
                                    error={Boolean(touched.state && errors.state)}
                                    helperText={touched.state && errors.state}
                                    label="State*"
                                />
                                {/* country  */}
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("country")}
                                    error={Boolean(touched.country && errors.country)}
                                    helperText={touched.country && errors.country}
                                    label="Country*"
                                />
                            </Stack>
                            {/* requirements  */}
                            <TextField
                                multiline
                                rows={4}
                                //size="small"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                    width: "100%"
                                }}
                                {...getFieldProps("requirements")}
                                error={Boolean(touched.requirements && errors.requirements)}
                                helperText={touched.requirements && errors.requirements}
                                label="Requirements*"
                            />
                            {/* <Box sx={{ mt: 2 }}> */}
                            {/* <Button
                                disableElevation
                                type="submit"
                                // disabled={isSubmitting}
                                onClick={() => console.log(errors)}
                                //size="small"
                                variant="outlined"
                                sx={{
                                    width: 220,
                                    fontWeight: 400,
                                    letterSpacing: 0.4,
                                    textTransform: "uppercase"
                                }}
                            >
                                Submit
                            </Button> */}
                            {/* </Box> */}
                        </Stack>

                        <Stack spacing={2} >
                            <Typography
                                sx={{ fontSize: 20, fontWeight: 600 }}
                            >Login Credential</Typography>
                            <Stack spacing={2} >
                                <TextField
                                    //size="small"
                                    sx={{
                                        ".MuiInputBase-root": {
                                            borderRadius: '4px',
                                        },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                    }}
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    label="Email*"
                                />
                                <Stack spacing={2} >
                                    <TextField
                                        //size="small"
                                        sx={{
                                            border: 'none',
                                            background: '#F8F8F8 0% 0% no-repeat padding-box',
                                            outline: 'none',
                                            ".MuiInputBase-root": {
                                                borderRadius: '4px',
                                            },
                                            '& > :not(style)': { m: 0 },
                                            "& .MuiInputLabel-root": {
                                                fontSize: 15
                                            },

                                        }}
                                        autoComplete="current-password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...getFieldProps('password')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword} edge="end">
                                                        <Iconify
                                                            // sx={{ width: 12, height: 12 }}
                                                            icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                    <Button variant="contained"
                                        onClick={() => setFieldValue("password", generatePassword(12))}
                                    >Generate Password</Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack spacing={2} >
                            <Typography sx={{ fontSize: 20, fontWeight: 600 }} >Quotation Details</Typography>
                            <Stack spacing={2} >

                                <Stack direction={'row'} spacing={4}>
                                    <TextField
                                        type="number"
                                        // //size="small"
                                        sx={{
                                            ".MuiInputBase-root": { borderRadius: '4px' },
                                            '& > :not(style)': { m: 0 },
                                            "& .MuiInputLabel-root": { fontSize: 15 },
                                            width: "50%"
                                        }}
                                        {...getFieldProps("amount")}
                                        error={Boolean(touched.amount && errors.amount)}
                                        helperText={touched.amount && errors.amount}
                                        label="Amount*"
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{ width: "50%" }}
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            label="Select Date"
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <TextField
                                    multiline={true}
                                    rows={4}
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        // width: "47%"
                                    }}
                                    {...getFieldProps("note")}
                                    error={Boolean(touched.note && errors.note)}
                                    helperText={touched.note && errors.note}
                                    label="Note*"
                                />
                            </Stack>
                            {/* <LoadingButton
                                // fullWidth
                                size="small"
                                type="submit"
                                variant="outlined"
                                loading={isSubmitting}
                                onClick={() => console.log(errors, values)}
                                sx={{
                                    width: 220,
                                    fontWeight: 400,
                                    letterSpacing: 0.4,
                                    textTransform: "uppercase"
                                }}
                            >
                                Login
                            </LoadingButton> */}
                            <Button
                                disableElevation
                                type="submit"
                                // disabled={isSubmitting}
                                onClick={() => console.log(errors)}
                                //size="small"
                                variant="outlined"
                                sx={{
                                    width: 220,
                                    fontWeight: 400,
                                    letterSpacing: 0.4,
                                    textTransform: "uppercase"
                                }}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    )
}