import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, addUser, editUser } from "../Redux/createSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grow,
  TablePagination,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserForm from "./UserForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [emailToConfirm, setEmailToConfirm] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.gender.toLowerCase().includes(search.toLowerCase()) ||
      user.country.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleOpenForm = (user = null) => {
    setSelectedUser(user || {});
    setIsEditing(!!user);
    setOpenForm(true);
  };

  const handleSaveUser = (user) => {
    console.log(user);
    if (isEditing) {
      dispatch(editUser(user));
    } else {
      const newUser = { ...user, id: Date.now() };
      dispatch(addUser(newUser));
    }
    setOpenForm(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (deleteIndex !== null) {
      const userToDelete = users.find((user) => user.id === deleteIndex);
      if (userToDelete.email === emailToConfirm) {
        dispatch(deleteUser(deleteIndex));
      }
    }
    setOpenDelete(false);
    setDeleteIndex(null);
    setEmailToConfirm("");
  };

  const handleOpenDeleteDialog = (userId) => {
    setDeleteIndex(userId);
    setOpenDelete(true);
  };

  const handleOpenDetailsDialog = (user) => {
    setSelectedUser(user);
    setOpenDetailsDialog(true);
  };

  const renderRow = (user, index) => (
    <Grow in={true} timeout={500 + index * 100} key={index}>
      <TableRow hover>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.age}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <IconButton
            color="primary"
            onClick={() => handleOpenDetailsDialog(user)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleOpenForm(user)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleOpenDeleteDialog(user.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </Grow>
  );

  const paginatedUsers = handleSearch.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 2}}>
      <Box sx={{ marginBottom: 2,display:"flex",justifyContent:"space-between",marginRight:"30px" }}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500, margin: "0 auto", display: "block" }}
        />
        <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenForm()}
        sx={{ marginBottom: 2 }}
      >
        Add User
      </Button>
      <UserForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleSave={handleSaveUser}
        initialData={selectedUser}
        isEditing={isEditing}
      />
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead
            sx={{
              background: "lightblue",
              "& .MuiTableCell-root": {
                color: "black",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "uppercase",
              },
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.map((user, index) => renderRow(user, index))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={handleSearch.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? <br />
          <TextField
            label="Enter Email to Confirm"
            variant="outlined"
            value={emailToConfirm}
            onChange={(e) => setEmailToConfirm(e.target.value)}
            fullWidth
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button
            color="secondary"
            onClick={handleDeleteUser}
            disabled={
              emailToConfirm !==
              users.find((user) => user.id === deleteIndex)?.email
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#1976d2" }}
        >
          User Details
        </DialogTitle>
        <DialogContent
          sx={{ padding: "20px 40px", backgroundColor: "#f4f6f8" }}
        >
          <Grow in={openDetailsDialog} timeout={500}>
            <Box sx={{ animation: "fadeIn 0.5s ease-in-out" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>First Name:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedUser?.firstName}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>Last Name:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedUser?.lastName}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" }, // Non-editable style
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>Email:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedUser?.email}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>Age:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedUser?.age}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>Gender:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedUser?.gender}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>Country:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedUser?.country}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>Address:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedUser?.address}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" },
                    }}
                  />
                </Grid>
              </Grid>
              <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", marginBottom: "5px" }}
                  >
                    <strong>Description:</strong>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    value={selectedUser?.description}
                    disabled
                    InputProps={{
                      readOnly: true,
                      style: { backgroundColor: "#e0e0e0" },
                    }}
                  />
            </Box>
          </Grow>
        </DialogContent>
        <DialogActions sx={{ padding: "10px 20px" }}>
          <Button
            onClick={() => setOpenDetailsDialog(false)}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
