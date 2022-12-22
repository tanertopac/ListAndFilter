import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserList from './pages/views/UserList';


const Router = () =>
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<UserList />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>

export default Router;