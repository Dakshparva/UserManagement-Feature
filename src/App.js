import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./Redux/store";

const App = () => (
  <Provider store={store}>
    <Router>
      <div style={{ display: "flex" }}>
        <SideMenu />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/"  element={<Dashboard />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/user-list" element={<UserList />} />
          </Routes>
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;
