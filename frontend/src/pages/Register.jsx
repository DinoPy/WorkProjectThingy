import React from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/users/userSlice';
import Header from '../components/Header';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setformData] = React.useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;
    const { user, isSuccess, isLoading, isError, message } = useSelector(
        (state) => state.user
    );

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Passwords are not matching');
        } else {
            const userData = {
                name,
                email,
                password,
            };

            dispatch(register(userData));
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setformData((pv) => ({ ...pv, [name]: value }));
    };

    React.useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isSuccess, isError, message, dispatch, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='register'>
            <Header />
            <div className='flex flex-col m-auto w-6/12 items-start p-6 border shadow mt-20 rounded-md'>
                <h1 className='text-6xl font-bold mt-10 mb-20 text-center uppercase'>
                    {' '}
                    Ready to register?
                </h1>
                <form
                    onSubmit={onSubmit}
                    className='mx-auto flex flex-col pb-6'
                >
                    <label
                        htmlFor='name'
                        className='block tracking-wider text-xl'
                    >
                        Your name
                    </label>
                    <input
                        className='my-2 input mb-10'
                        onChange={onChange}
                        name='name'
                        id='name'
                        value={name}
                        placeholder='Please type in your name'
                        type='text'
                        required={true}
                    />

                    <label
                        htmlFor='email'
                        className='block tracking-wider text-xl'
                    >
                        Your email
                    </label>
                    <input
                        className='my-2 input mb-10'
                        onChange={onChange}
                        name='email'
                        id='email'
                        value={email}
                        placeholder='Please type in your email'
                        type='email'
                        required={true}
                    />

                    <label
                        htmlFor='password'
                        className='block tracking-wider text-xl'
                    >
                        Your password
                    </label>
                    <input
                        className='my-2 input mb-10'
                        onChange={onChange}
                        name='password'
                        id='password'
                        value={password}
                        placeholder='Please type in your password'
                        type='password'
                        required={true}
                    />

                    <label
                        htmlFor='password2'
                        className='block tracking-wider text-xl'
                    >
                        Type in the password again
                    </label>
                    <input
                        className='my-2 input mb-2'
                        onChange={onChange}
                        name='password2'
                        id='password2'
                        value={password2}
                        placeholder='Retype password'
                        type='password'
                        required={true}
                    />
                    <br />
                    <button type='submit' className='text-2xl button'>
                        {' '}
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
