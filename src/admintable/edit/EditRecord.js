import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function EditRecord({ openModal, row, onHandleSave }) {
  const [open, setOpen] = useState(false);
  const [rowValue, setRowValue] = useState({});

  useEffect(() => {
    // setOpen(true);
    if(openModal){
        setOpen(true)
    }
    setRowValue(row);
  }, [row,openModal]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (e, field) => {
    const value = e?.target?.value;
    setRowValue((prevRowValue) => ({
      ...prevRowValue,
      [field]: value,
    }));
  };

  return (
    <React.Fragment>
      <Dialog open={open}>
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <Typography variant='h6' sx={{ textAlign: 'center', marginBottom: 2 }}>
                Edit
                </Typography>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                fullWidth
                label="Name"
                variant="outlined"
                value={rowValue?.name}
                onChange={(e) => {
                  handleValueChange(e, 'name');
                }}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="email"
                fullWidth
                label="Email"
                variant="outlined"
                value={rowValue?.email}
                onChange={(e) => {
                  handleValueChange(e, 'email');
                }}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="role"
                fullWidth
                label="Role"
                variant="outlined"
                value={rowValue?.role}
                onChange={(e) => {
                  handleValueChange(e, 'role');
                }}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onHandleSave(rowValue);
              handleClose();
            }}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}