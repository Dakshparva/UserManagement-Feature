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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const sortedUsers = [...handleSearch].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleOpenForm = (user = null) => {
    setSelectedUser(user || {});
    setIsEditing(!!user);
    setOpenForm(true);
  };

  const handleSaveUser = (user) => {
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

  const renderRow = (user, index) => {
    const currentIndex = page * rowsPerPage + index + 1;
    return (
      <Grow in={true} timeout={500 + index * 100} key={index}>
        <TableRow hover>
          <TableCell>{currentIndex}</TableCell>
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
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
          marginRight: "30px",
        }}
      >
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

      <TableContainer component={Paper} elevation={3}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("id")}>
                ID{" "}
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </TableCell>
              <TableCell onClick={() => handleSort("firstName")}>
                First Name{" "}
                {sortConfig.key === "firstName" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </TableCell>
              <TableCell onClick={() => handleSort("lastName")}>
                Last Name{" "}
                {sortConfig.key === "lastName" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </TableCell>
              <TableCell onClick={() => handleSort("age")}>
                Age{" "}
                {sortConfig.key === "age" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </TableCell>
              <TableCell onClick={() => handleSort("email")}>
                Email{" "}
                {sortConfig.key === "email" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => renderRow(user, index))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        component="div"
        count={sortedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
