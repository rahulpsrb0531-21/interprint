import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material"
import AnimateButton from "../../ui-component/AnimateButton"


export default function Login() {
    return (
        <Stack alignItems={"center"} mt={6} >
            <Stack sx={{
                width: 460,
                // bgcolor: "red",
                border: "1px solid rgb(238, 238, 238)",
                alignItems: "center",
                py: 6,
                borderRadius: "4px"
            }} spacing={2.8}>
                <Typography sx={{ fontSize: 18, fontWeight: 600, textTransform: "uppercase" }} >Login To Interprint</Typography>

                <TextField
                    select
                    sx={{
                        width: 320,
                        ".MuiInputBase-root": {
                            borderRadius: '4px',
                            //  height: "40px" 
                        },
                        '& > :not(style)': { m: 0 },
                        "& .MuiInputLabel-root": { fontSize: 15 },
                    }}
                    label="Select Role"
                >
                    <MenuItem value='Admin' >Admin</MenuItem>
                    <MenuItem value='Client' >Client</MenuItem>
                    <MenuItem value='Production' >Production</MenuItem>
                    <MenuItem value='Sales' >Sales</MenuItem>
                    <MenuItem value='Stock' >Stock</MenuItem>
                    <MenuItem value='Purchase' >Purchase</MenuItem>
                    <MenuItem value='Dispatch' >Dispatch</MenuItem>
                    <MenuItem value='Prepress' >Pre Press</MenuItem>
                </TextField>
                <TextField type="text"
                    label="Email"
                    sx={{
                        width: 320,
                        ".MuiInputBase-root": {
                            borderRadius: '4px',
                            //  height: "40px" 
                        },
                        '& > :not(style)': { m: 0 },
                        "& .MuiInputLabel-root": { fontSize: 15 },
                    }}
                />
                <TextField type="password"
                    label="Password"
                    sx={{
                        width: 320,
                        ".MuiInputBase-root": {
                            borderRadius: '4px',
                            //  height: "40px" 
                        },
                        '& > :not(style)': { m: 0 },
                        "& .MuiInputLabel-root": { fontSize: 15 },
                    }}
                />
                <Typography sx={{
                    fontSize: 14, textAlign: "right",
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    cursor: "pointer",
                    width: "100%"
                }} >forgot password?</Typography>
                {/* <Stack>
                <Checkbox/>
            </Stack> */}
                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            type="submit"
                            // disabled={isSubmitting}
                            size="small"
                            // variant="contained"
                            variant="outlined"
                            sx={{
                                width: 320,
                                height: "50px",
                                fontWeight: 400,
                                // borderRadius: 8,
                                letterSpacing: 0.4,
                                textTransform: "uppercase"
                            }}
                        >
                            Sign in
                        </Button>
                    </AnimateButton>
                </Box>
            </Stack>
        </Stack>
    )
}