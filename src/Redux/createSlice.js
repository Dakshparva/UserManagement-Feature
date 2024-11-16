import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const userSlice = createSlice({
  name: "users",
  initialState: loadFromLocalStorage(),
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    editUser: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveToLocalStorage(state);
      }
    },
    deleteUser: (state, action) => {
      const updatedState = state.filter((user) => user.id !== action.payload);
      saveToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
