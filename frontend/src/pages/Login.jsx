import React from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/users/userSlice';
import Header from '../components/Header';

const Register = () => {
    const [formData, setformData] = React.useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isSuccess, isLoading, isError, message } = useSelector(
        (state) => state.user
    );

    React.useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isSuccess, isError, message, dispatch, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setformData((pv) => ({ ...pv, [name]: value }));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <Header />
            <div className='flex flex-col m-auto w-4/12 items-start p-6 border shadow mt-20 rounded-md'>
                <form
                    onSubmit={onSubmit}
                    className=' mx-auto flex flex-col w-9/12 pb-6'
                >
                    <h1 className='text-6xl font-bold mt-10 mb-20 text-center uppercase'>
                        {' '}
                        Login in
                    </h1>
                    <label
                        htmlFor='email'
                        className='block tracking-wider text-xl'
                    >
                        Your email
                    </label>
                    <input
                        className='my-4 input '
                        onChange={onChange}
                        name='email'
                        id='email'
                        value={email}
                        placeholder='Please type in your email'
                        type='email'
                        required={true}
                    />
                    <br />
                    <label
                        htmlFor='password'
                        className='block tracking-wider text-xl'
                    >
                        Your password
                    </label>
                    <input
                        className='my-4  input'
                        onChange={onChange}
                        name='password'
                        id='password'
                        value={password}
                        placeholder='Please type in your password'
                        type='password'
                        required={true}
                    />
                    <br />
                    <button type='submit' className='text-2xl button '>
                        {' '}
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
