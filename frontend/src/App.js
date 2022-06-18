import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import LeftNav from './components/LeftNav';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DirectItem from './pages/DirectItem';
import { useSelector } from 'react-redux';

function App() {
    const { user } = useSelector((state) => state.user);

    return (
        <div className='font-main text-white max-w-7xl mx-auto my-20 rounded-2xl overflow-hidden text-xl'>
            <BrowserRouter>
                {user && <LeftNav />}
                <main
                    className={`py-6  ${
                        user && 'md:ml-72'
                    } max-w-7xl mx-auto bg-main px-5 relative`}
                >
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/:listId' element={<DirectItem />} />
                        <Route path='*' element={<h1> Page not found!</h1>} />
                    </Routes>
                </main>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
