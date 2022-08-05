import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register"
import About from "./pages/about";
import ReviewMinerals from "./pages/reviewMinerals";
import LearnMinerals from "./pages/learnMinerals";
import NoPage from "./pages/noPage"
import Home from "./pages/home"
import Quiz from "./pages/quiz"
import { useState } from "react"


function App() {

  const [activeLearner, setActiveLearner] = useState(null);

  const Navigation = () => {
    return (
      <nav>
        <Link to="/">Home </Link>
        <Link to="/about">About </Link>
        <Link to="/register">Register </Link>
        <Link to="/login">Login </Link>
        <Link to="/learnMinerals">Learn Minerals </Link>
        <Link to="/reviewMinerals">Review Minerals </Link>
        <Link to="/quiz">Quiz </Link>
      </nav>
    );
  };

  const loginStatus = activeLearner === null ? 
      "Please log in" : "Logged in as " + activeLearner.name;

  return (
    <main>
      <h1>MiniMin</h1>
      <h2>{loginStatus}</h2>
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login setActiveLearner={setActiveLearner}/>} />
          <Route path="about" element={<About />} />
          <Route path="reviewMinerals" element={<ReviewMinerals />} />
          <Route path="learnMinerals" element={<LearnMinerals />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </main>

  );
}

export default App;
