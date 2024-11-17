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
  const alphabetRegex = /^[A-Za-z\s]*$/;

  const resetForm = () => {
    setUser(initialData || {});
    setErrors({});
  };

  useEffect(() => {
    if (!open) resetForm();
  }, []);

  useEffect(() => {
    if (initialData) setUser(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      const ageValue = Number(value);
      if (ageValue < 0 || ageValue > 100) return;
    }
    if (name === "country" && !alphabetRegex.test(value)) {
      return;
    }
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email" && !emailRegex.test(value)) {
      error = "Invalid email format.";
    } else if (name === "age" && (isNaN(value) || value <= 0 || value >= 100)) {
      error = "Age must be a positive number and below 100.";
    } else if (name === "country" && !alphabetRegex.test(value)) {
      error = "Country should contain alphabets only.";
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
    if (!user.age || isNaN(user.age) || user.age <= 0 || user.age >= 100)
      newErrors.age = "Age must be a positive number and below 100.";
    if (!user.country || !alphabetRegex.test(user.country))
      newErrors.country = "Country should contain alphabets only.";
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          error={!!errors.age}
          helperText={errors.age}
          inputProps={{ min: 0, max: 100 }}
        />
        <TextField
          label="Country"
          name="country"
          value={user.country || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          error={!!errors.country}
          helperText={errors.country}
        />
        <TextField
          label="Address"
          name="address"
          value={user.address || ""}
          onChange={handleChange}
          onBlur={handleBlur}
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
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { resetForm(); handleClose(); }}>Cancel</Button>
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
