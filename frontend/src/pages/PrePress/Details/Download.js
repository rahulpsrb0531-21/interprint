import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Iconify from "../../../components/Iconify";


export default function Download() {

    const rows = [
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
        { fileName: 'Lorem Ipsum Lorem', uploadDate: "01/02/2024" },
    ]

    return (
        <Stack direction={'row'} spacing={2} >
            <Box
                sx={{ pt: 1 }}
            >
                <Typography variant="TabMainTitle" >Preview</Typography>
                <Box sx={{
                    width: 400,
                    height: 600,
                    bgcolor: "#8FD0D0",
                    borderRadius: '4px',
                    mt: 6
                }}>

                </Box>
            </Box>
            <Stack >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 580 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell align="right">Upload Date</TableCell>
                                <TableCell align="right">Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.fileName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.fileName}
                                    </TableCell>
                                    <TableCell align="right">{row.uploadDate}</TableCell>
                                    <TableCell align="right">
                                        <Iconify icon={"bxs:file-pdf"} sx={{
                                            width: 30,
                                            height: 30,
                                            color: "#D22B2B"
                                        }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    )
}