import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { filter, set } from 'lodash'
// @mui
import {
    Card, Table, Stack, Button, TableRow, MenuItem, TableBody, TableCell, Typography,
    TableContainer, TablePagination, Box, Grid,
    CardContent, TextField, Chip, Container
} from '@mui/material'
import { UserListHead, UserListToolbar } from "../../../sections/@dashboard/user"
import SearchNotFound from "../../../components/SearchNotFound"
import salesServices from "../../../services/salesServices"

const TABLE_HEAD = [
    { id: 'firstName', label: 'First Name', alignRight: false },
    { id: 'lastName', label: 'Last Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
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
        return filter(array, (_user) => _user?.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1

        );
    }
    return stabilizedThis.map((el) => el[0]);
}


export default function ClientTable() {
    const navigate = useNavigate()
    const [clientList, setClientList] = useState([])
    const [open, setOpen] = useState(false)

    const [page, setPage] = useState(0)

    const [order, setOrder] = useState('asc')

    const [selected, setSelected] = useState([])

    const [orderBy, setOrderBy] = useState('name')

    const [filterName, setFilterName] = useState('')

    const [rowsPerPage, setRowsPerPage] = useState(5)

    // const fakeData = [
    //     { firstName: "John", lastName: "Doe", email: "john@gmail.com", company: "JohnIT" },
    //     { firstName: "John", lastName: "Doe", email: "john@gmail.com", company: "JohnIT" },
    //     { firstName: "John", lastName: "Doe", email: "john@gmail.com", company: "JohnIT" },
    //     { firstName: "John", lastName: "Doe", email: "john@gmail.com", company: "JohnIT" },
    //     { firstName: "John", lastName: "Doe", email: "john@gmail.com", company: "JohnIT" },
    // ]

    // const [open, setOpen] = useState(false)
    // const [id, setId] = useState('')

    useEffect(() => {
        getAllClient()
    }, [])

    async function getAllClient() {
        const res = await salesServices.getAllClient()
        if (res && res.success) {
            // console.log("res", res?.data)
            setClientList(res?.data)
        }
    }

    const handleRequestSort = (event, clientList) => {
        const isAsc = orderBy === clientList && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(clientList);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = clientList.map((n) => n.orderName);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientList.length) : 0

    const filteredClient = applySortFilter(clientList, getComparator(order, orderBy), filterName)

    const isUserNotFound = filteredClient.length === 0;

    return (
        <Container maxWidth="lg">
            <Typography sx={{ pb: 2, fontSize: 28, fontWeight: 700 }} >Client Lists</Typography>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <Card
                        sx={{
                            height: "auto",
                            boxShadow: "0px 2px 6px #0000000A",
                            borderRadius: 0,
                            width: '78vw',
                        }}
                    >
                        <UserListToolbar
                            numSelected={selected.length}
                            filterName={filterName}
                            onFilterName={handleFilterByName}
                            placeholder={"Search client name..."}
                        />
                        <CardContent sx={{ padding: 0 }}>
                            <TableContainer>
                                <Table>
                                    <UserListHead
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
                                        {filteredClient
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, i) => {
                                                const { firstName, lastName, email, companyName } = row
                                                return (
                                                    <TableRow hover sx={{ cursor: 'pointer' }}
                                                        // onClick={() => navigate(`/sales/enquiry/${firstName}/details`, { state: row })}
                                                        tabIndex={-1}
                                                    >
                                                        <TableCell align="left">
                                                            {firstName}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {lastName}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {email}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyName}
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

                                    {isUserNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    <SearchNotFound searchQuery={filterName} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        </CardContent>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={clientList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}