import * as React from 'react';
import { useContext } from 'react';
import { CustomContext } from "../context/Context.js"
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const membership = ['free', 'standard', 'premium']

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'UserID',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'membership',
        numeric: false,
        disablePadding: false,
        label: 'Membership',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'First Name',
    },
    {
        id: 'lastName',
        numeric: false,
        disablePadding: false,
        label: 'LastName',
    },
    {
        id: 'creationDate',
        numeric: false,
        disablePadding: false,
        label: 'Created',
    },
    {
        id: 'updationDate',
        numeric: false,
        disablePadding: false,
        label: 'Last Updated',
    },
    {
        id: 'edit',
        numeric: false,
        disablePadding: false,
        label: 'Manage',
    },
];

function EnhancedTableHead(props) {

    const { currentUserInfo} = useContext(CustomContext)
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all tasks',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'right'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const { selected, setFetchCallCount } = useContext(CustomContext)
    let navigate = useNavigate();
    const handleGoBack = () => { //handles the event from clicking Signout button
        navigate(-1);
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <><Button
                    onClick={handleGoBack}
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    style={{ background: 'orange' }}>Back</Button>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        All Members
                    </Typography></>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => { console.log(selected) }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Refresh table">
                    <IconButton onClick={() => setFetchCallCount(prevState => prevState + 1)} >
                        <RefreshIcon />
                    </IconButton>

                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    //const [selected, setSelected] = React.useState([]);
    const { selected, setSelected, setFetchCallCount, fetchCallCount, currentUserInfo } = useContext(CustomContext)
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //for managing the drop down menus in the task edit form
    const [currentMembership, setCurrentMembership] = React.useState('');
    const [currentEmail, setCurrentEmail] = React.useState('');
    const [currentFirstName, setCurrentFirstName] = React.useState('');
    const [currentLastName, setCurrentLastName] = React.useState('');
    const [currentId, setCurrentId] = React.useState('');
    const [currentRole, setCurrentRole] = React.useState('');

    const handleMembershipChange = (event) => {
        setCurrentMembership(event.target.value);
    };

    const handleEmailChange = (event) => {
        setCurrentEmail(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setCurrentFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setCurrentLastName(event.target.value);
    };

    //dialog post form
    const [openForm, setOpenForm] = React.useState(false);
    const handleClickOpenForm = (row) => {

        setCurrentId(row.id)
        setCurrentMembership(row.membership)
        setCurrentEmail(row.email)
        setCurrentFirstName(row.firstName)
        setCurrentLastName(row.lastName)
        setCurrentRole(row.role)
        setOpenForm(true);
        console.log(row);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleSubmitUpdateTask = (event) => {
        console.log("handling submit")
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        console.log(data)
        try {
            fetch(`http://capstonefitnessbackend-env.eba-izrrrwby.ap-southeast-2.elasticbeanstalk.com/api/users/members/${currentId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: currentEmail,
                    membership: currentMembership,
                    firstName: currentFirstName,
                    lastName: currentLastName,
                    role: currentRole,
                })
            }).then(res => {
                if (!res.ok) throw new Error(res.status);
                else return res.json();
            }).then(response => {
                console.log('Successfully updated user')
                setFetchCallCount(prevState => prevState + 1)
                handleCloseForm()
            })
                .catch(error => {
                    console.log(error.message);
                });

        } catch (error) {
            console.log(error.message)
        }
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = userState.tasks.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;


    const initialState = {
        loading: true, //true when loading and no data in post
        tasks: [], //empty
        error: ''
    }
    const userReducer = (userState, action) => { // reducer function for fetching api
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    tasks: action.payload,
                    error: ''
                }
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    tasks: {},
                    error: 'Something went wrong'
                }
            default:
                return {
                    tasks: {}
                }
        }
    }
    const [userState, userDispatch] = useReducer(userReducer, initialState) //useReducer hook for api call
    useEffect(() => {

        const USER_API_URL = currentUserInfo.role === 'superadmin' ? 'http://capstonefitnessbackend-env.eba-izrrrwby.ap-southeast-2.elasticbeanstalk.com/api/users/' : 'http://capstonefitnessbackend-env.eba-izrrrwby.ap-southeast-2.elasticbeanstalk.com/api/users/customers'

        //fetches all users
        const fetchUserData = () => {
            try {
                axios.get(USER_API_URL)
                    .then(response => {
                        userDispatch({ type: "FETCH_SUCCESS", payload: (response.data) })
                        console.log("Fetch All Users Successful")
                        console.log(response.data)
                    })
                    .catch(error => {
                        userDispatch({ type: "FETCH_ERROR" })
                    })
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchUserData();
    }, [fetchCallCount])

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userState.tasks.length) : 0;
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={userState.tasks.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(userState.tasks, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.id}
                                        
                                            </TableCell>
                                            {/* <TableCell align="right">{row.id}</TableCell> */}
                                            <TableCell align="right">{capitalizeFirstLetter(row.role)}</TableCell>
                                            <TableCell align="right">{capitalizeFirstLetter(row.membership)}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{capitalizeFirstLetter(row.firstName)}</TableCell>
                                            <TableCell align="right">{capitalizeFirstLetter(row.lastName)}</TableCell>
                                            <TableCell align="right">{row.creationDate.slice(0, 10)}</TableCell>
                                            <TableCell align="right">{row.updationDate.slice(0, 10)}</TableCell>
                                            <TableCell align="right"><Button color='success' onClick={() => handleClickOpenForm(row)}>Edit</Button></TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {/* Edit Task Form starts here */}
                        <Dialog open={openForm} onClose={handleCloseForm}>
                            <DialogTitle>Edit Member Details </DialogTitle>
                            <DialogContent>
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline />
                                    <Box
                                        sx={{
                                            marginTop: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >

                                        <Box component="form" noValidate onSubmit={handleSubmitUpdateTask} sx={{ mt: 1 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        id="membership"
                                                        select
                                                        fullWidth
                                                        label="Membership"
                                                        value={currentMembership}
                                                        onChange={handleMembershipChange}
                                                        helperText="Membership"
                                                    >
                                                        {membership.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        id="email"
                                                        fullWidth
                                                        label="Email"
                                                        value={currentEmail}
                                                        onChange={handleEmailChange}
                                                        helperText="Email"
                                                    >
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        id="firstName"
                                                        fullWidth
                                                        label="First Name"
                                                        value={currentFirstName}
                                                        onChange={handleFirstNameChange}
                                                        helperText="First Name"
                                                    >
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        id="lastName"
                                                        fullWidth
                                                        label="Last Name"
                                                        value={currentLastName}
                                                        onChange={handleLastNameChange}
                                                        helperText="Last Name"
                                                    >
                                                    </TextField>
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 1 }}
                                                style={{ background: '#2E3B55' }}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                onClick={handleCloseForm}
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 1, mb: 2 }}
                                                style={{ background: '#f44336' }}
                                            >
                                                Cancel
                                            </Button>


                                        </Box>
                                    </Box>
                                </Container>
                            </DialogContent>
                        </Dialog>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userState.tasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>

    );

}




