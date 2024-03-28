import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { useSnackbar } from "notistack";
// material
import { alpha } from '@mui/material/styles'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import enquiryServices from "../services/enquiryServices";
import { useNavigate } from "react-router-dom";

export default function EnquiryForm() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

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
            requirements: ""
        },
        validationSchema: candidateProfileSchema,
        onSubmit: (v) => {
            const data = {
                firstName: v?.firstName,
                lastName: v?.lastName,
                email: v?.email,
                phone: v?.phone,
                companyName: v?.companyName,
                companyAddress: {
                    street: v?.street,
                    city: v?.city,
                    state: v?.state,
                    zip: v?.zip,
                    country: v?.country
                },
                requirements: v?.requirements
            }
            // console.log(data)
            createEnquiryForm(data)
        }
    })


    async function createEnquiryForm(data) {
        const res = await enquiryServices.createEnquiry(data)
        // console.log("res>>>>>>>>", res)
        // setSubmitting(false)
        if (res && res.success) {

            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            resetForm()
            navigate("/thank-you")
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
        isSubmitting,
        handleSubmit,
        getFieldProps,
        resetForm
    } = formik

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack alignItems={"center"} justifyContent={"center"}
                    sx={{
                        // bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                        // height: '100%',
                        // width: '100%',
                        py: 5,
                        width: "100vw",
                        // px: 5,
                    }}
                >
                    {/* <Typography onClick={() => navigate("/thank-you")} >Click Me!</Typography> */}
                    <Stack spacing={2.8}
                        sx={{
                            bgcolor: 'rgb(255, 255, 255)', p: 4,
                            border: '1px solid #e0e0e0', borderRadius: "4px",
                            width: "50%"
                        }}
                    >
                        <Typography
                            sx={{ fontSize: 28, fontWeight: 600 }}
                        >Enquiry Details</Typography>
                        <Stack spacing={2} >
                            {/* firstName and LastName  */}
                            <Stack direction={'row'} spacing={4}  >
                                <TextField
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
                            <Stack direction={'row'} spacing={4}  >
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": {
                                            borderRadius: '4px',
                                        },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                        width: "50%"
                                    }}
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    label="Email*"
                                />
                                <TextField
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
                            </Stack>
                            {/* companyName  */}
                            <TextField
                                // size="small"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                    // width: "47%"
                                }}
                                {...getFieldProps("companyName")}
                                error={Boolean(touched.companyName && errors.companyName)}
                                helperText={touched.companyName && errors.companyName}
                                label="Company Name*"
                            />

                            {/* street address  */}
                            <TextField
                                multiline={true}
                                rows={2}
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                                {...getFieldProps("street")}
                                error={Boolean(touched.street && errors.street)}
                                helperText={touched.street && errors.street}
                                label="Street Address*"
                            />
                            {/* city and zip  */}
                            <Stack direction={'row'} spacing={4}  >
                                <TextField
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
                            {/* state  */}
                            <Stack direction={'row'} spacing={4}>
                                <TextField
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
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                                {...getFieldProps("requirements")}
                                error={Boolean(touched.requirements && errors.requirements)}
                                helperText={touched.requirements && errors.requirements}
                                label="Requirements*"
                            />
                            {/* <Box sx={{ mt: 2 }}> */}
                            <Button
                                disableElevation
                                type="submit"
                                // disabled={isSubmitting}
                                onClick={() => console.log(errors)}
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
                            {/* </Box> */}
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    )
}