import React, { useState } from 'react'
import { Box, Button, FormControl, FormHelperText, MenuItem, Stack, TextField, Typography } from "@mui/material"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import { useFormik, Form, FormikProvider } from "formik"
import AnimateButton from "../../ui-component/AnimateButton"
import authServices from '../../services/authServices'
import { setCredentials } from '../../redux/reducers/authSlice'

export default function Login() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')
    // console.log("token", token)
    // console.log("user", user)
    const [showPassword, setShowPassword] = useState(false)
    // const user = JSON.parse(localStorage.getItem('user'))

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        role: Yup.string().required("Role is required"),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: ""
        },
        validationSchema: LoginSchema,
        onSubmit: (v) => {
            // console.log('v >>>>>', v)
            const data = {
                email: v?.email,
                password: v?.password
            }
            // console.log('data', data)
            login(v)
        },
    })

    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setSubmitting,
        setFieldValue
    } = formik

    async function login(data) {
        const role = (values?.role).toLocaleLowerCase()
        const res = await authServices.login(role, data)
        // console.log("res>>>>>>>>", res)
        // setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            // console.log("res>>>>>>>", res)
            dispatch(setCredentials({ ...res }))
            localStorage.setItem("access", res.accessToken)
            navigate(`${res?.user?.navConfig[0]?.path}`)
        } else {
            enqueueSnackbar(res?.data || "server error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                        <FormControl>
                            <TextField
                                select
                                sx={{
                                    width: 320,
                                    ".MuiInputBase-root": {
                                        borderRadius: '4px',
                                        //  height: "40px" 
                                    },
                                    // '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                }}
                                label="Select Role"
                                value={values.role} {...getFieldProps('role')}
                            >
                                <MenuItem value='Admin' >Admin</MenuItem>
                                {/* <MenuItem value='Client' >Client</MenuItem> */}
                                <MenuItem value='Production' >Production</MenuItem>
                                <MenuItem value='Sales' >Sales</MenuItem>
                                <MenuItem value='Stock' >Stock</MenuItem>
                                <MenuItem value='Purchase' >Purchase</MenuItem>
                                <MenuItem value='Dispatch' >Dispatch</MenuItem>
                                <MenuItem value='Prepress' >Pre Press</MenuItem>
                            </TextField>
                            <FormHelperText>{touched.role && errors.role}</FormHelperText>
                        </FormControl>
                        <TextField type="email"
                            label="Email"
                            sx={{
                                ".MuiInputBase-root": { borderRadius: '4px' },
                                '& > :not(style)': { m: 0 },
                                "& .MuiInputLabel-root": { fontSize: 15 },
                                width: "70%"
                            }}
                            {...getFieldProps("email")}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextField type="password"
                            label="Password"
                            // size="small"
                            sx={{
                                ".MuiInputBase-root": { borderRadius: '4px' },
                                '& > :not(style)': { m: 0 },
                                "& .MuiInputLabel-root": { fontSize: 15 },
                                width: "70%"
                            }}
                            {...getFieldProps("password")}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        <Typography sx={{
                            fontSize: 14,
                            textAlign: "center",
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
                                    // onClick={() => console.log('error', errors)}
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
                        <Typography>Already a client?
                            <Link to={'/client/login'} >
                                Log In
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    )
}