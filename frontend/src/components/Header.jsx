import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/users/userSlice';
import { listReset } from '../features/lists/listsSlice';
import Joke from './Joke';

const Header = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(reset());
        dispatch(logout());
        navigate('/login');
        dispatch(listReset());
    };

    return (
        <header className='flex justify-between items-center border-bottom pb-5 h-32 px-6'>
            <Joke />
            <div className=' text-xl pl-6'>
                {user ? (
                    <button onClick={() => onLogout()}> Logout</button>
                ) : (
                    <>
                        <Link to='/login' className='mr-4'>
                            {' '}
                            Login
                        </Link>
                        <Link to='/register' className='mr-4'>
                            {' '}
                            Register
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
