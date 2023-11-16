import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import {Button} from '@mui/material';
import TaskQueue from "./TaskQueue";
import TestRouter from './TestRouter';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
        <BrowserRouter>
        <nav>
        <Link to="/taskqueue"><Button variant='contained' color="success">Task Queue</Button></Link>
        <Link to="/singer"><Button variant='contained' color="success">Complete the Lyrics</Button></Link>
        </nav>
        <Routes>
            <Route exact path="/taskqueue" element={<TaskQueue/>}></Route>
            <Route exact path="/singer" element={<TestRouter/>}></Route>
            <Route exact path="/singer/:singer_person" element={<TestRouter/>}></Route>
        </Routes>
        </BrowserRouter> 
        </React.StrictMode>
);
reportWebVitals();
