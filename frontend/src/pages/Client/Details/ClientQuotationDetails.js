import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import Iconify from "../../../components/Iconify"
import { useDropzone } from 'react-dropzone'


export default function ClientQuotationDetails() {
    const { state } = useLocation()
    const [status, setStatus] = useState(state?.status)
    const [upload, setUpload] = useState(null)
    // console.log("state >>>>>>", state)


    const onDrop = useCallback((acceptedFiles) => {
        const docFile = acceptedFiles[0]
        // Display resume file name
        setUpload(docFile.name)
        // Upload the resume file to the server using axios or your preferred HTTP library
        const formData = new FormData();
        formData.append('pdf', docFile);
        // server.post(`/candidate/document/${user?._id}/${'resume'}`, formData)
        //     .then(res => {
        //         // setUpload(res?.data?.filePath)
        //         // getCandidateById()
        //     })
        //     .catch(err => {
        //         return null
        //     })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.pdf, .doc, .docx', // Accept only specific file types
        maxFiles: 1,
    })
    const dropzoneStyles = {
        border: '1px dashed #cccccc',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: '4px',
        padding: '20px',
        // textAlign: 'center',
        cursor: 'pointer',
        backgroundImage: upload ? `url(${upload})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '160px',
        width: 300,
        height: 80
    }



    return (
        <Stack spacing={2}
            sx={{
                width: "78vw",
                px: 5,
            }}
        >
            <Stack direction={'row'} alignItems={"center"} justifyContent={'space-between'}
            // sx={{
            //     width: "78vw",
            //     px: 5,
            // }}
            >
                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Company Name : {state?.enquiry?.companyName}</Typography>
                {/* <TextField
                    select
                    sx={{
                        ".MuiInputBase-root": { borderRadius: '4px' },
                        '& > :not(style)': { m: 0 },
                        "& .MuiInputLabel-root": { fontSize: 15 },
                        width: 200,
                        height: "50px"
                    }}
                    // label="Years of experience*"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                // {...getFieldProps('experience')} 
                >
                    <MenuItem value="Pending" >Pending</MenuItem>
                    <MenuItem value="Approve" >Approve</MenuItem>
                    <MenuItem value="Rejected" >Rejected</MenuItem>
                </TextField> */}
                <Stack direction={'row'} alignItems={"center"}
                    spacing={1}
                >
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            bgcolor: 'green',
                            height: "32px",
                            width: 80,
                            fontWeight: 400,
                            ":hover": {
                                bgcolor: 'green'
                            }
                        }}
                        onClick={() => setStatus("Approve")}
                    >Approve</Button>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            bgcolor: 'red',
                            height: "32px",
                            width: 80,
                            fontWeight: 400,
                            ":hover": {
                                bgcolor: 'red'
                            }
                        }}
                        onClick={() => setStatus("Rejected")}
                    >Reject</Button>
                </Stack>
            </Stack>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Amount : {state?.amount}</Typography>
            <Stack>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Note :</Typography>
                <Box sx={{ width: "60%" }} >
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }} >{state?.note}</Typography>
                </Box>
            </Stack>

            {
                status === "Approve" && (
                    <Stack spacing={1} >
                        <Typography sx={{ fontSize: 16, fontWeight: 600 }}
                        >Upload PO</Typography>
                        {/* <Stack sx={{
                            width: 300,
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
                                <Typography>browse to upload it.</Typography>
                            </Stack>
                        </Stack> */}
                        {/* <div>
                            <div {...getRootProps()} style={dropzoneStyles}>
                                <input {...getInputProps()} />
                                {!uploadedImage &&
                                    <p>Upload Logo</p>
                                }
                            </div>
                        </div> */}
                        <div {...getRootProps()} style={dropzoneStyles}>
                            <input {...getInputProps()} />
                            {(upload) ? (
                                <Typography variant="body1" sx={{ textTransform: 'capitalize' }} >
                                    {upload || `.pdf`}</Typography>
                            ) : isDragActive ? (
                                <Typography variant="body1">Drop the files here...</Typography>
                            ) : (
                                <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: 50 }}  >
                                    <Typography sx={{ fontSize: 16 }} >Upload file resume</Typography>
                                </Stack>
                            )}
                        </div>

                    </Stack>
                )
            }

            <Button variant="outlined" sx={{ width: 200, mt: 4 }}
                disabled={status !== "Approve"}
            >Update Quotation</Button>
            {/* <Stack></Stack> */}

        </Stack>
    )
}