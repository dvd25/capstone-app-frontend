import * as React from 'react';
import { useContext } from 'react';
import { CustomContext } from "../../context/Context";
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

const priorityArray = [1, 2, 3, 4, 5]


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
  const { selected, setSelected, setFetchCallCount} = useContext(CustomContext)

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
          All Tasks
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => { console.log(selected) }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Refresh table">
          <IconButton onClick={()=>setFetchCallCount(prevState => prevState + 1)} >
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
  const { selected, setSelected, setFetchCallCount, currentUserInfo } = useContext(CustomContext)
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //for managing the drop down menus in the task edit form
  const [currentCategory, setCurrentCategory] = React.useState('');
  const [currentStatus, setCurrentStatus] = React.useState('');
  const [currentDescription, setCurrentDescription] = React.useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState('');
  const [currentComments, setCurrentComments] = React.useState('');
  const [currentPriority, setCurrentPriority] = React.useState('');
  const [setCurrentAssignee] = React.useState('');
  const [currentTaskId, setCurrentTaskId] = React.useState('');

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

  const handlePriorityChange = (event) => {
    setCurrentPriority(event.target.value);
  };

  //dialog post form
  const [openForm, setOpenForm] = React.useState(false);
  const handleClickOpenForm = (row) => {
    setOpenForm(true);
    setCurrentTaskId(row.taskId)
    setCurrentCategory(row.category)
    setCurrentStatus(row.status)
    setCurrentDescription(row.description)
    setCurrentPlaceholder(row.description)
    setCurrentComments(row.comments)
    setCurrentPriority(row.priority)
    setCurrentAssignee(row.assignedTo)
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
      fetch(`http://localhost:8080/api/tasks/${currentTaskId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: currentCategory,
          description: currentDescription,
          comments: currentComments,
          status: currentStatus,
          assignedTo: currentUserInfo.id,
          priority: currentPriority
        })
      }).then(res => {
        if (!res.ok) throw new Error(res.status);
        else return res.json();
      }).then(response => {
        console.log('Successfully updated task')
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
      const newSelected = props.tasks.map((n) => n.taskId);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.tasks.length) : 0;
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
              rowCount={props.tasks.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(props.tasks, getComparator(order, orderBy))
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

            {/* Edit Task Form starts here */}
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

                    <Box component="form" noValidate onSubmit={handleSubmitUpdateTask} sx={{ mt: 1 }}>
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
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="outlined-select-priority"
                            select
                            fullWidth
                            label="Priority"
                            value={currentPriority}
                            onChange={handlePriorityChange}
                            helperText="Priority"
                          >
                            {priorityArray.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
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
            {/* Edit Task Form ends here */}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.tasks.length}
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




