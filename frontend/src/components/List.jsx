import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    fetchLists,
    addList,
    addItem,
    listReset,
} from '../features/lists/listsSlice';
import Spinner from './Spinner';

const List = (props) => {
    const [listTitleInput, setListTitleInput] = React.useState('');
    const [itemContentInputs, setItemContentInputs] = React.useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { lists, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.lists
    );
    const { user } = useSelector((state) => state.user);

    React.useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
            navigate('/login');
        }

        if (!isError && user) {
            dispatch(fetchLists());
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    //  ON CHANGE HANDLERS

    function onItemChangeHandler(e) {
        const { name, value } = e.target;
        setItemContentInputs((pv) => ({ ...pv, [name]: value }));
    }

    // ON SUBMIT HANDLERS

    function onSubmitHandler(e) {
        e.preventDefault();
        dispatch(addList(listTitleInput));
        setListTitleInput('');
    }

    function onItemSubmitHandler(e, listId) {
        e.preventDefault();
        const obj = {
            listId,
            content: itemContentInputs[listId],
        };

        dispatch(addItem(obj));
        setItemContentInputs((pv) => ({ ...pv, [listId]: '' }));
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='pl-10'>
            <h1 className='text-4xl pb-2 mb-20 first-line:pl-4 first-letter:text-5xl'>
                {' '}
                May the poor souls of ours withstand the constant bs that's
                brough to us by the great gods of the company whose name we
                shall not mention.
            </h1>

            <form onSubmit={onSubmitHandler} className='pb-8     border-bottom'>
                <input
                    className='input'
                    placeholder='New list Title'
                    onChange={(e) => setListTitleInput(e.target.value)}
                    value={listTitleInput}
                    name='title'
                    required={true}
                />
                <button className='  button ml-10 '> Add List</button>
            </form>

            {lists?.map((list) => (
                <div className='my-10 border-b pb-4' key={list._id}>
                    <h2 className='text-2xl font-bold pb-6'>{list.name}</h2>
                    <form onSubmit={(e) => onItemSubmitHandler(e, list._id)}>
                        <input
                            className='input mb-6'
                            placeholder='New Item'
                            onChange={onItemChangeHandler}
                            name={list._id}
                            value={itemContentInputs[list._id]}
                            required={true}
                        />
                        <button className='button ml-10'> Add Item</button>
                    </form>
                    <ul>
                        {list.items?.map((item) => (
                            <li className='item' key={item._id}>
                                {item.content}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default List;
