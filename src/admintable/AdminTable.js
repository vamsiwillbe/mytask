import React,{useState,useEffect} from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import { Button } from '@mui/base';
import { TextField } from '@mui/material';

import EditRecord from './edit/EditRecord';

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

// const rows = [
//   createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
// ];

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

const headCells = [
  {
    id: 'id',
   
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    disablePadding: false,
    
    
    
    label: 'Name',
  },
  {
    id: 'email',
    disablePadding: false,
    
    
    label: 'Email',
  },
  {
    id: 'role',
    
    disablePadding: false,
    
    label: 'Role',
  }
  
];










// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };



// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function EnhancedTable() {


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
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
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

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
  
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
            Admin Dashboard
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={deleteRows}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  const [globalRows,setGlobalRows]=useState([])
  const [rows,setRows]=useState([]);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRows(data);
        setGlobalRows(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const deleteRows = () => {
    // Create a new array of rows excluding the selected IDs
    const updatedRows = rows.filter((row) => !selected.includes(row.id));
  
    // Update the state with the new array
    setRows(updatedRows);
    setGlobalRows(updatedRows)
  
    // Clear the selected array
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
    console.log(newSelected,'newSelected')
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage,rows],
  );

  const [openModal,setOpenModal]=useState(false);
  const [editRow,setEditRow]=useState("");
  useEffect(() => {
    console.log("Updated rows in useEffect:", visibleRows);
    
    setRows(rows)
  }, [rows]);
  
  const handleSave = (editedRow) => {
    // Find the index of the edited row in rows
    const rowIndex = rows.findIndex((row) => row.id === editedRow.id);
  
    // Update the state using the callback form of setRows
    setRows((prevRows) => {
      // Create a new array with the updated row
      const updatedRows = [...prevRows];
      updatedRows[rowIndex] = editedRow;
  
      // You can also close the modal or perform any other necessary actions
      setOpenModal(false);
  
      // Return the updated array
      return updatedRows;
    });
    setGlobalRows((prevRows) => {
      // Create a new array with the updated row
      const updatedRows = [...prevRows];
      updatedRows[rowIndex] = editedRow;
  
      // You can also close the modal or perform any other necessary actions
      
  
      // Return the updated array
      return updatedRows;
    });

  };
  
  
  
  const handleSearch=(text)=>{
    const filteredRows = globalRows.filter(
      (row) =>
      row.id.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
      row.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      row.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      row.role.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Update the state with the filtered rows
    setRows(filteredRows);
  }
  

  return (
    <Box sx={{ width: '100%' }}>
      
      <EditRecord openModal={openModal} row={editRow} onHandleSave={ handleSave} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e?.target?.value);
            handleSearch(e.target.value);
          }}
        />
        <IconButton
          className="search-icon"
          color="primary"
          onClick={() => handleSearch(searchInput)}
        >
          <SearchIcon />
        </IconButton>
      </Box>
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
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <>
                  <TableRow
                    hover
                   
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                       onClick={(event) => handleClick(event, row.id)}
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
                      {row.id}
                    </TableCell>
                    <TableCell >{row.name}</TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell >{row.role}</TableCell>
                    <TableCell onClick={()=>{
                        console.log("button")
                        setOpenModal(prev => true);
                        setEditRow(row);
                        console.log(openModal)

                       
                      }}>

                      <Button 
                      >
                        Edit
                      </Button>
                    </TableCell>
                    
                    
                  </TableRow>


                  </>
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