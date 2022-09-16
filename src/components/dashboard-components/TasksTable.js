import * as React from 'react';
import { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import { CustomContext } from "../../context/Context";
import axios from 'axios';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

function createData(taskId, description, comments, status, assignedTo, category, priority) {
  return {
    taskId, description, comments, status, assignedTo, category, priority
  };
}

const rows = [
  createData(1, "Check up with customer", "Follow up asap", "Completed", "David", "New Customer", 5),
  createData(2, "Edit customers 123 details", "", "Ongoing", "David", "Update Customer", 3),
  createData(3, "Cancel customer 2012 membership", "", "Unreviewed", "Tommy", "Delete Customer", 4),
  createData(4, "Filler", "", "Unreviewed", "Tommy", "Delete Customer", 2),
  createData(5, "Filler", "", "Unreviewed", "Tommy", "Delete Customer", 2),
  createData(6, "Filler", "", "Unreviewed", "Tommy", "Delete Customer", 2),
  createData(72, "Filler", "", "Unreviewed", "Alan", "Delete Customer", 4),
  createData(8, "Filler", "", "Unreviewed", "Sam", "Delete Customer", 2),
  createData(9, "Filler", "", "Unreviewed", "Tommy", "Delete Customer", 2),
  createData(10, "Filler", "", "Unreviewed", "Tommy", "Delete Customer", 2),
  createData(321, "Filler", "", "Unreviewed", "Tommy", "Delete Customer", 2),
  createData(12, "Filler", "", "Unreviewed", "Tommy", "Delete Customer", 2),

];

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

const categories = [
  {
    value: 'customer',
  },
  {
    value: 'employee',
  }
];

const status = [
  {
    value: 'unassigned',
  },
  {
    value: 'pending',
  },
  {
    value: 'accepted',
  },
  {
    value: 'started',
  },
  {
    value: 'completed',
  }
];


const headCells = [
  {
    id: 'taskId',
    numeric: true,
    disablePadding: true,
    label: 'Task ID',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'assignedTo',
    numeric: false,
    disablePadding: false,
    label: 'Assigned To',
  },
  {
    id: 'priority',
    numeric: true,
    disablePadding: false,
    label: 'Priority',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'comments',
    numeric: false,
    disablePadding: false,
    label: 'Comments',
  },
  {
    id: 'edit',
    numeric: false,
    disablePadding: false,
    label: 'Edit',
  },
];

function EnhancedTableHead(props) {
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
  const { selected, setSelected } = useContext(CustomContext)

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
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Your Assigned Tasks
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => { console.log(selected) }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton >
            <FilterListIcon />
          </IconButton>

        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  //const [selected, setSelected] = React.useState([]);
  const { selected, setSelected } = useContext(CustomContext)
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //for managing the drop down menus in the task edit form
  const [currentCategory, setCurrentCategory] = React.useState('');
  const [currentStatus, setCurrentStatus] = React.useState('');
  const [currentDescription, setCurrentDescription] = React.useState('Description');
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState('');
  const [currentComments, setCurrentComments] = React.useState('');

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setCurrentDescription(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setCurrentComments(event.target.value);
  };

  //dialog post form
  const [openForm, setOpenForm] = React.useState(false);
  const handleClickOpenForm = (row) => {
    setOpenForm(true);
    setCurrentCategory(row.category)
    setCurrentStatus(row.status)
    setCurrentDescription(row.description)
    setCurrentPlaceholder(row.description)
    setCurrentComments(row.comments)
    console.log(row);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = () => {
    console.log("handling submit")
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = state.tasks.map((n) => n.taskId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, taskId) => {
    const selectedIndex = selected.indexOf(taskId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, taskId);
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

  const isSelected = (taskId) => selected.indexOf(taskId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const initialState = {
    loading: true, //true when loading and no data in post
    tasks: [], //empty
    error: ''
  }

  const reducer = (state, action) => { // reducer function for fetching api
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

  useEffect(() => {

    const URL = `http://localhost:8080/api/tasks`
    axios.get(URL)
      .then(response => {
        dispatch({ type: "FETCH_SUCCESS", payload: (response.data) })
        console.log("Finished dispatch")
      })
      .catch(error => {
        dispatch({ type: "FETCH_ERROR" })
      })

  }, [] //renders once
  )

  const [state, dispatch] = useReducer(reducer, initialState) //useReducer hook for api call

  console.log(state)


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
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(state.tasks, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.taskId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.taskId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.taskId}
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
                        padding="none"
                      >
                        {row.taskId}
                      </TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.assignedTo}</TableCell>
                      <TableCell align="right">{row.priority}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.comments}</TableCell>
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
            <Dialog open={openForm} onClose={handleCloseForm}>
              <DialogTitle>Edit Task </DialogTitle>
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

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="outlined-select-category"
                            select
                            fullWidth
                            label="Category"
                            value={currentCategory}
                            onChange={handleCategoryChange}
                            helperText="Category"
                          >
                            {categories.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="outlined-select-status"
                            select
                            fullWidth
                            label="Status"
                            value={currentStatus}
                            onChange={handleStatusChange}
                            helperText="Status"
                          >
                            {status.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="filled-textarea-description"
                            label="Description"
                            placeholder={currentPlaceholder}
                            multiline
                            onChange={handleDescriptionChange}
                            value={currentDescription}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="filled-textarea-comments"
                            label="Notes"
                            placeholder="Notes..."
                            multiline
                            onChange={handleCommentsChange}
                            value={currentComments}
                          />
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
          count={rows.length}
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




