import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete'; // Correct import statement

// Define columns for the data grid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'role', headerName: 'Role', type: 'number', width: 90 },
];

export default function DataTable() {
  // State to hold the rows and filtered rows
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  
  // State for search text, pageSize, and current page
  const [searchText, setSearchText] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10); // Number of rows per page
  const [page, setPage] = useState(1);

  // State to manage selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRows(data);
        setFilteredRows(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  // Update filtered rows when search text changes
  useEffect(() => {
    const filtered = rows.filter((row) =>
      // Check if any property of the row includes the search text
      Object.values(row).some((value) => String(value).toLowerCase().includes(searchText.toLowerCase()))
    );
    setFilteredRows(filtered);
    setPage(1); // Reset page when search is performed
  }, [searchText, rows]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredRows.length / pageSize);

  // Function to handle row selection
  const handleRowSelection = (selected) => {
    setSelectedRows(selected.selectionModel);
  };

 

  return (
    <div style={{ height: 500, width: '100%' }}>
      {/* Search Bar */}
      <TextField
        variant="outlined"
        label="Search"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* Search Icon */}
              <IconButton className="search-icon">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Data Grid with row selection */}
      <DataGrid
        rows={filteredRows.slice((page - 1) * pageSize, page * pageSize)}
        columns={columns}
        pageSize={pageSize}
        pagination
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        rowCount={filteredRows.length}
        rowsPerPageOptions={[pageSize]}
        paginationMode="server"
        autoHeight
        checkboxSelection
        onSelectionModelChange={handleRowSelection}
      />

    

      {/* Pagination Controls */}
      <div>
        <button onClick={() => setPage(1)}>First Page</button>
        <button onClick={() => setPage(Math.max(page - 1, 1))}>Previous Page</button>
        <button onClick={() => setPage(Math.min(page + 1, totalPages))}>Next Page</button>
        <button onClick={() => setPage(totalPages)}>Last Page</button>
        <span>{`Page ${page} of ${totalPages}`}</span>
      </div>
    </div>
  );
}
