import { useDispatch } from 'react-redux';
import React from 'react';
import { editList } from '../features/lists/listsSlice';

const EditMode = (props) => {
    const dispatch = useDispatch();

    const [editContent, setEditContent] = React.useState({
        newName: props.item.name,
        newDescription: props.item.description,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            editList({
                listId: props.item._id,
                obj: editContent,
            })
        );
        props.editModeToggle(false);
    };

    return (
        <div className='border-bottom pb-5'>
            <h2 className='text-2xl'> Edit </h2>
            <form
                className='flex flex-col gap-4 items-start'
                onSubmit={onSubmit}
            >
                <label>
                    New Name
                    <input
                        type='text'
                        id='newName'
                        className='block input'
                        name='newName'
                        value={editContent.newName}
                        required={true}
                        onChange={(e) =>
                            setEditContent((pv) => ({
                                ...pv,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                </label>
                <label>New Description</label>
                <textarea
                    type='text'
                    className='block border-2 rounded-md pl-2 py-1 text-black w-6/12 input scroll-feature'
                    name='newDescription'
                    value={editContent.newDescription}
                    required={true}
                    rows={5}
                    onChange={(e) =>
                        setEditContent((pv) => ({
                            ...pv,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
                <button
                    type='submit'
                    className='bg-red-200 py-2 px-6 text-black rounded-lg'
                >
                    {' '}
                    Submit change
                </button>
            </form>
        </div>
    );
};

export default EditMode;
