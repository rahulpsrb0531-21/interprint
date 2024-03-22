import { Button, Dialog, Stack, TextField, Typography, alpha } from "@mui/material";


export default function CreateClientModal({ open, setOpen }) {

    const onClose = () => {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth={'lg'}
        >
            <Stack alignItems={"center"} justifyContent={"center"}
                sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                    height: '100%', py: 5
                }}
            >
                <Stack spacing={2.8}
                    sx={{
                        bgcolor: 'rgb(255, 255, 255)', p: 4,
                        border: '1px solid #e0e0e0', borderRadius: "4px",
                        width: "40%"
                    }}
                >
                    <Typography
                        sx={{ fontSize: 28, fontWeight: 600 }}
                    >Enquiry Details</Typography>
                    <Stack spacing={2} >
                        {/* firstName and LastName  */}
                        <Stack direction={'row'} spacing={4}  >
                            <TextField
                                size="small"
                                sx={{
                                    ".MuiInputBase-root": {
                                        borderRadius: '4px',
                                    },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                            // {...getFieldProps("firstName")}
                            // error={Boolean(touched.firstName && errors.firstName)}
                            // helperText={touched.firstName && errors.firstName}
                            // label="First Name*"
                            />
                            <TextField
                                size="small"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                            // {...getFieldProps("lastName")}
                            // error={Boolean(touched.lastName && errors.lastName)}
                            // helperText={touched.lastName && errors.lastName}
                            // label="Last Name*"
                            />
                        </Stack>
                        {/* email and phone   */}
                        <Stack direction={'row'} spacing={4}  >
                            <TextField
                                size="small"
                                sx={{
                                    ".MuiInputBase-root": {
                                        borderRadius: '4px',
                                    },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                            // {...getFieldProps("email")}
                            // error={Boolean(touched.email && errors.email)}
                            // helperText={touched.email && errors.email}
                            // label="Email*"
                            />
                            <TextField
                                size="small"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                            // {...getFieldProps("phone")}
                            // error={Boolean(touched.phone && errors.phone)}
                            // helperText={touched.phone && errors.phone}
                            // label="Phone*"
                            />
                        </Stack>
                        {/* companyName  */}
                        <TextField
                            size="small"
                            sx={{
                                ".MuiInputBase-root": { borderRadius: '4px' },
                                '& > :not(style)': { m: 0 },
                                "& .MuiInputLabel-root": { fontSize: 15 },
                                width: "47%"
                            }}
                        // {...getFieldProps("companyName")}
                        // error={Boolean(touched.companyName && errors.companyName)}
                        // helperText={touched.companyName && errors.companyName}
                        // label="Company Name*"
                        />

                        {/* street address  */}
                        <TextField
                            size="small"
                            sx={{
                                ".MuiInputBase-root": { borderRadius: '4px' },
                                '& > :not(style)': { m: 0 },
                                "& .MuiInputLabel-root": { fontSize: 15 },
                                width: "80%"
                            }}
                        // {...getFieldProps("street")}
                        // error={Boolean(touched.street && errors.street)}
                        // helperText={touched.street && errors.street}
                        // label="Street Address*"
                        />
                        {/* city and zip  */}
                        <Stack direction={'row'} spacing={4}  >
                            <TextField
                                size="small"
                                sx={{
                                    ".MuiInputBase-root": {
                                        borderRadius: '4px',
                                    },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                            // {...getFieldProps("city")}
                            // error={Boolean(touched.city && errors.city)}
                            // helperText={touched.city && errors.city}
                            // label="City*"
                            />
                            <TextField
                                size="small"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                    width: "27%"
                                }}
                            // {...getFieldProps("zip")}
                            // error={Boolean(touched.zip && errors.zip)}
                            // helperText={touched.zip && errors.zip}
                            // label="Zip code*"
                            />
                        </Stack>
                        {/* state  */}
                        <TextField
                            size="small"
                            sx={{
                                ".MuiInputBase-root": { borderRadius: '4px' },
                                '& > :not(style)': { m: 0 },
                                "& .MuiInputLabel-root": { fontSize: 15 },
                                width: "47%"
                            }}
                        // {...getFieldProps("state")}
                        // error={Boolean(touched.state && errors.state)}
                        // helperText={touched.state && errors.state}
                        // label="State*"
                        />
                        {/* country  */}
                        <TextField
                            size="small"
                            sx={{
                                ".MuiInputBase-root": { borderRadius: '4px' },
                                '& > :not(style)': { m: 0 },
                                "& .MuiInputLabel-root": { fontSize: 15 },
                                width: "47%"
                            }}
                        // {...getFieldProps("country")}
                        // error={Boolean(touched.country && errors.country)}
                        // helperText={touched.country && errors.country}
                        // label="Country*"
                        />
                        {/* requirements  */}
                        <TextField
                            multiline
                            rows={4}
                            size="small"
                            sx={{
                                ".MuiInputBase-root": { borderRadius: '4px' },
                                '& > :not(style)': { m: 0 },
                                "& .MuiInputLabel-root": { fontSize: 15 },
                                width: "80%"
                            }}
                        // {...getFieldProps("requirements")}
                        // error={Boolean(touched.requirements && errors.requirements)}
                        // helperText={touched.requirements && errors.requirements}
                        // label="Requirements*"
                        />
                        {/* <Box sx={{ mt: 2 }}> */}
                        <Button
                            disableElevation
                            type="submit"
                            // disabled={isSubmitting}
                            // onClick={() => console.log(errors)}
                            size="small"
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
        </Dialog>
    )
}