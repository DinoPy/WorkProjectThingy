import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    addItem,
    fetchLists,
    removeItem,
    editList,
} from '../features/lists/listsSlice';

import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import userSlice from '../features/users/userSlice';
import Header from '../components/Header';
import EditMode from '../components/EditMode';
import LineChart from '../components/LineChart';

const DirectItem = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [inputField, setInputField] = React.useState('');
    const [editMode, setEditMode] = React.useState(false);
    const listItem =
        useSelector(
            (state) =>
                state.lists.lists.filter(
                    (list) => list._id === params.listId
                )[0]
        ) || [];

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.lists
    );

    React.useEffect(() => {
        if (!listItem.length) {
            dispatch(fetchLists());
        }

        return () => {};
    }, []);

    React.useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, isSuccess, message, dispatch]);

    function onAddItemSubmit(e, listId) {
        e.preventDefault();
        const obj = {
            listId,
            content: inputField,
        };

        dispatch(addItem(obj));
        setInputField('');
    }

    function convertToDate(string) {
        return new Date(string);
    }

    const groupedDates = () =>
        listItem.items?.reduce((groupedData, item) => {
            const date = convertToDate(item.createdAt).toLocaleDateString();

            if (!groupedData[date]) {
                groupedData[date] = [item];
            } else {
                groupedData[date].push(item);
            }
            return groupedData;
        }, {});

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='   p-6'>
            <Header />
            {/* TITLE + DESCRIPTION   && toggle edit*/}
            <div className='my-20'>
                <div
                    className={` flex justify-between items-center ${
                        listItem.description ? '' : 'border-b-2 pb-4 '
                    }`}
                >
                    <h1 className={`text-5xl  font-bold  `}>
                        {' '}
                        {listItem.name}
                    </h1>
                    <label className=' cursor-pointer hover:underline-offset-2 hover:underline'>
                        Edit
                        <input
                            type='checkbox'
                            className='hidden'
                            onClick={(e) => setEditMode((pv) => !pv)}
                            value={editMode}
                        />
                    </label>
                </div>
                {listItem.description && (
                    <p className=' py-10 border-bottom'>
                        {' '}
                        {listItem.description}
                    </p>
                )}
            </div>

            {/* EDIT MODE  */}
            {editMode && (
                <EditMode item={listItem} editModeToggle={setEditMode} />
            )}

            <form
                onSubmit={(e) => onAddItemSubmit(e, params.listId)}
                className='py-5'
            >
                <input
                    className='w-72 border-2 rounded-md pl-2 mb-8 text-black'
                    placeholder='New Item'
                    onChange={(e) => {
                        setInputField(e.target.value);
                    }}
                    value={inputField}
                    name='itemAddInput'
                    required={true}
                />
                <button className=' button ml-10'>Add Item</button>
            </form>

            {groupedDates() &&
                Object.keys(groupedDates())
                    .reverse()
                    ?.map((date, index) => (
                        <div className='mb-10' key={index}>
                            <div className='flex justify-between px-6  border-bottom pb-4 mb-4'>
                                <p className='text-bold text-3xl '>{date}</p>
                                <p
                                    className='cursor-pointer text-xl text-bold'
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            groupedDates()[date].map(
                                                (item) => item.content
                                            )
                                        );
                                    }}
                                >
                                    {' '}
                                    Copy today{' '}
                                </p>
                            </div>

                            {groupedDates()[date]?.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex justify-between items-center py-1'
                                >
                                    <p
                                        className='text-xl cursor-pointer'
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                `${item.content}`
                                            )
                                        }
                                    >
                                        {item.content}{' '}
                                        <span className='text-xxs'>
                                            {convertToDate(
                                                item.createdAt
                                            ).toLocaleString()}
                                        </span>
                                    </p>
                                    {/* <p> {listItem.}</p> */}
                                    <div
                                        onClick={(e) => {
                                            dispatch(
                                                removeItem({
                                                    listId: listItem._id,
                                                    itemId: item._id,
                                                })
                                            );
                                        }}
                                        className='w-4 h-4 p-5  rounded-full text-white cursor-pointer grid justify-center content-center'
                                    >
                                        <BsTrash />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
        </div>
    );
};

export default DirectItem;
