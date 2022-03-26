import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Feeds from "./pages/Feeds";
import Publication from "./pages/Publication";
import reportWebVitals from "./reportWebVitals";
import NotFound from "./pages/NotFound";
import UpdateOnePost from "./pages/UpdateOnePost";
import UpdateOneComment from "./pages/UpdateOneComment";
import Profil from "./pages/Profil";
import Admin from "./pages/Admin";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/adminPanel" element={<Admin />} />
        <Route exact path="/user/:id" element={<Profil />} />
        <Route exact path="/feeds" element={<Feeds />} />
        <Route exact path="/post/:id" element={<Publication />} />
        <Route exact path="/editPost/:id" element={<UpdateOnePost />} />
        <Route
          exact
          path="/editComment/:id/post/:idPost"
          element={<UpdateOneComment />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
