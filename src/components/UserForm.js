import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";

const UserForm = ({
  open,
  handleClose,
  handleSave,
  initialData,
  isEditing,
}) => {
  const [user, setUser] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [userAdded, setUserAdded] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (initialData) setUser(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email" && !emailRegex.test(value)) {
      error = "Invalid email format.";
    } else if (name === "age" && (isNaN(value) || value <= 0)) {
      error = "Age must be a positive number.";
    } else if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.firstName) newErrors.firstName = "First Name is required.";
    if (!user.lastName) newErrors.lastName = "Last Name is required.";
    if (!user.email || !emailRegex.test(user.email))
      newErrors.email = "Invalid email format.";
    if (!user.gender) newErrors.gender = "Gender is required.";
    if (!user.age || isNaN(user.age) || user.age <= 0)
      newErrors.age = "Age must be a positive number.";
    if (!user.address) newErrors.address = "Address is required.";
    if (!user.description) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(user);
      setUserAdded(true);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          value={user.firstName || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={user.lastName || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          select
          label="Gender"
          name="gender"
          value={user.gender || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.gender}
          helperText={errors.gender}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          label="Age"
          name="age"
          value={user.age || ""}
          type="number"
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.age}
          helperText={errors.age}
        />
        <TextField
          label="Country"
          name="country"
          value={user.country || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={user.address || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          label="Description"
          name="description"
          value={user.description || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {isEditing ? "Update User" : "Add User"}
        </Button>
      </DialogActions>
      <Snackbar
        open={userAdded}
        autoHideDuration={2000}
        onClose={() => setUserAdded(false)}
        message={
          isEditing ? "User updated successfully" : "User added successfully"
        }
      />
    </Dialog>
  );
};

export default UserForm;
