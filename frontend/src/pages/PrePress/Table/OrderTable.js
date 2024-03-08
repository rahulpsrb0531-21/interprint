import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { filter, set } from 'lodash'
// @mui
import {
    Card, Table, Stack, Button, TableRow, MenuItem, TableBody, TableCell, Typography,
    TableContainer, TablePagination, Box, Grid,
    CardContent, TextField, Chip
} from '@mui/material'
import TableHeadComponent from "./TableHead"
import TableListToolbar from "./TableListToolbar"
import SearchNotFound from "../../../components/SearchNotFound"

const TABLE_HEAD = [
    { id: 'ipNumber', label: 'ip Number', alignRight: false },
    { id: 'orderDate', label: 'order Date', alignRight: false },
    { id: 'productName', label: 'Product Name', alignRight: false },
    { id: 'deliveryDate', label: 'Delivery Date', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'priority', label: 'Priority', alignRight: false }
]

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user?.recruiterName.toLowerCase().indexOf(query.toLowerCase()) !== -1

        );
    }
    return stabilizedThis.map((el) => el[0]);
}


export default function OrderTable() {
    const navigate = useNavigate()
    const [orderList, setOrderList] = useState([])

    const [page, setPage] = useState(0)

    const [order, setOrder] = useState('asc')

    const [selected, setSelected] = useState([])

    const [orderBy, setOrderBy] = useState('name')

    const [filterName, setFilterName] = useState('')

    const [rowsPerPage, setRowsPerPage] = useState(5)

    const fakeData = [
        {
            ip: "IP576", orderDate: "01/01/2024", productName: "chat Masala 50g Mono",
            deliveryDate: "03/01/2024, 07/01/2024, 11/01/2024", status: "Printing",
            priority: "upgent"
        },
        // {
        //     ip: "IP576", orderDate: "01/01/2024", productName: "chat Masala 50g Mono",
        //     deliveryDate: "03/01/2024, 07/01/2024, 11/01/2024", status: "Printing",
        //     priority: "upgent"
        // },
        // {
        //     ip: "IP576", orderDate: "01/01/2024", productName: "chat Masala 50g Mono",
        //     deliveryDate: "03/01/2024, 07/01/2024, 11/01/2024", status: "Printing",
        //     priority: "upgent"
        // },
        // {
        //     ip: "IP576", orderDate: "01/01/2024", productName: "chat Masala 50g Mono",
        //     deliveryDate: "03/01/2024, 07/01/2024, 11/01/2024", status: "Printing",
        //     priority: "upgent"
        // },
    ]

    // const [open, setOpen] = useState(false)
    // const [id, setId] = useState('')

    // useEffect(() => {
    //     getAllJob()
    // }, [])

    // async function getAllJob() {
    //     const res = await jobServices.getJobs()
    //     if (res && res.success) {
    //         console.log("res", res?.data)
    //         setJobs(res?.data)
    //     }
    // }

    const handleRequestSort = (event, orderList) => {
        const isAsc = orderBy === orderList && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(orderList);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = orderList.map((n) => n.orderName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0

    const filteredOrders = applySortFilter(orderList, getComparator(order, orderBy), filterName)

    const isUserNotFound = filteredOrders.length === 0;

    return (
        <Box
        // sx={{ m: 0, mt: 2.3 }}
        // mt={10}

        >

            < Stack direction="row" alignItems="center" justifyContent="space-between"
                // mb={1.5}
                sx={{
                    // bgcolor: "red", 
                    // p: 1
                }}
            >
                <Stack
                    direction={'row'}
                    alignItems={"center"}
                    spacing={1}
                >
                    <TextField
                        select
                        sx={{
                            width: 200,
                            ".MuiInputBase-root": { borderRadius: '4px' },
                            '& > :not(style)': { m: 0 },
                            "& .MuiInputLabel-root": { fontSize: 15 },
                            // width: '100%'
                        }}
                        label="Select Client"
                    >
                        <MenuItem value='Godrej' >Godrej</MenuItem>
                    </TextField>
                    <Button size="small"
                        variant="outlined"
                        sx={{
                            // width: 120,
                            height: "50px",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            // borderRadius: 8,
                            letterSpacing: 0.4
                        }}
                    >
                        view profile
                    </Button>
                </Stack>
                <Button size="small" size="small"
                    variant="outlined"
                    sx={{
                        // width: 120,
                        height: "50px",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        // borderRadius: 8,
                        letterSpacing: 0.4
                    }}
                // type="submit"
                >
                    create job card
                </Button>
            </Stack>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <Card
                        sx={{
                            height: "auto",
                            boxShadow: "0px 2px 6px #0000000A",
                            borderRadius: 0,
                            // width: '100%'
                        }}
                    >
                        <TableListToolbar
                            numSelected={selected.length}
                            filterName={filterName}
                            onFilterName={handleFilterByName}
                            placeholder={"Search orders..."}
                        />
                        <CardContent sx={{ padding: 0 }}>
                            <TableContainer>
                                <Table>
                                    <TableHeadComponent
                                        columns={TABLE_HEAD}
                                    // order={order}
                                    // orderBy={orderBy}
                                    // headLabel={TABLE_HEAD}
                                    // rowCount={orderList.length}
                                    // numSelected={selected.length}
                                    // onRequestSort={handleRequestSort}
                                    // onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {fakeData
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, i) => {
                                                const { ip,
                                                    orderDate,
                                                    productName,
                                                    deliveryDate,
                                                    status,
                                                    priority } = row
                                                return (
                                                    <TableRow hover sx={{ cursor: 'pointer' }} tabIndex={-1}>
                                                        <TableCell align="left">
                                                            {/* {ip} */}
                                                            <Chip label={ip}
                                                                variant="outlined"
                                                                onClick={() => navigate("/pre-press/details")}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {orderDate}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {productName}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {deliveryDate}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {status}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {/* {priority} */}
                                                            <Chip label={priority} color="error" />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    {/* {isUserNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    <SearchNotFound searchQuery={filterName} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )} */}
                                </Table>
                            </TableContainer>
                        </CardContent>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={orderList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}