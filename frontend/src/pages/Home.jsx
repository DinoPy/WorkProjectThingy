import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import List from '../components/List';
import Spinner from '../components/Spinner';
import Header from '../components/Header';

const Home = () => {
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.user
    );

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, isSuccess, isError, message, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='relative'>
            <Header />
            <h1 className='text-6xl py-14 font-bold text-center'>
                Welcome
                {user
                    ? ' ' +
                      user.name.charAt(0).toUpperCase() +
                      user.name.slice(1)
                    : null}
            </h1>

            <List />
        </div>
    );
};

export default Home;
