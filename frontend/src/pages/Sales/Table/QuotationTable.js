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
import CreateClientModal from "../../../components/modal/CreateClientModal"
import salesServices from "../../../services/salesServices"
import { formatDateWithMonthAndYear } from "../../../utils/function"

const TABLE_HEAD = [
    { id: 'amount', label: 'Amount', alignRight: false },
    { id: 'note', label: 'Note', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
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
        return filter(array, (_user) => _user?.status.toLowerCase().indexOf(query.toLowerCase()) !== -1

        );
    }
    return stabilizedThis.map((el) => el[0]);
}


export default function QuotationTable() {
    const navigate = useNavigate()
    const [quotationList, setQuotationList] = useState([])
    const [open, setOpen] = useState(false)

    const [page, setPage] = useState(0)

    const [order, setOrder] = useState('asc')

    const [selected, setSelected] = useState([])

    const [orderBy, setOrderBy] = useState('name')

    const [filterName, setFilterName] = useState('')

    const [rowsPerPage, setRowsPerPage] = useState(5)

    // const [open, setOpen] = useState(false)
    // const [id, setId] = useState('')

    useEffect(() => {
        getAllQuotation()
    }, [])

    async function getAllQuotation() {
        const res = await salesServices.getAllQuotation()
        if (res && res.success) {
            console.log("res", res?.data)
            setQuotationList(res?.data)
        }
    }

    const handleRequestSort = (event, quotationList) => {
        const isAsc = orderBy === quotationList && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(quotationList);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = quotationList.map((n) => n.orderName);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quotationList.length) : 0

    const filteredQuotation = applySortFilter(quotationList, getComparator(order, orderBy), filterName)

    const isUserNotFound = filteredQuotation.length === 0;

    return (
        <Container maxWidth="lg" >
            <Typography sx={{ pb: 2, fontSize: 28, fontWeight: 700 }} >Quotation Lists</Typography>
            <Grid container  >
                <Grid item xs={12} md={12} lg={12}>
                    <Card
                        sx={{
                            height: "auto",
                            boxShadow: "0px 2px 6px #0000000A",
                            borderRadius: 0,
                            width: '78vw',
                            // bgcolor: "red"
                        }}
                    >
                        <UserListToolbar
                            numSelected={selected.length}
                            filterName={filterName}
                            onFilterName={handleFilterByName}
                            placeholder={"Search status..."}
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
                                        {filteredQuotation
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, i) => {
                                                const { amount, note, date, status } = row
                                                return (
                                                    <TableRow hover sx={{ cursor: 'pointer' }}
                                                        // onClick={() => navigate(`/sales/enquiry/${firstName}/details`, { state: row })}
                                                        tabIndex={-1}
                                                    >
                                                        <TableCell align="left">
                                                            {amount}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {note}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {formatDateWithMonthAndYear(date)}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {status}
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
                            count={quotationList.length}
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