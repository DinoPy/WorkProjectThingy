import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { removeList } from '../features/lists/listsSlice';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const LeftNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { lists } = useSelector((state) => state.lists);
    const [searchField, setSearchField] = React.useState('');
    const [filteredList, setFilteredList] = React.useState([]);

    const runDeleteItem = (list) => {
        dispatch(removeList(list._id));
        navigate('/');
    };

    React.useEffect(() => {
        setFilteredList(
            lists.filter((list) =>
                list.name.toLowerCase()?.includes(searchField.toLowerCase())
            )
        );
    }, [searchField, lists]);
    return (
        <div className='w-72 bg-navBar h-full absolute rounded-tl-xl rounded-bl-xl p-5 text-white'>
            <h1 className='py-10 text-7xl  text-[#FDAC93] font-bold text-center '>
                <Link to='/'> NFFHBS</Link>
            </h1>
            <h2 className='text-3xl font-bold pb-6 '>Issues</h2>
            <input
                placeholder='Search'
                type='text'
                onChange={(e) => {
                    setSearchField(e.target.value);
                }}
                value={searchField}
                className='input w-full mb-5'
            />
            {filteredList?.map((list, index) => (
                <div
                    className='my-1 flex justify-between space-y-4 items-center border-bottom '
                    key={index}
                >
                    <div className=''>
                        {' '}
                        <NavLink
                            to={`/${list._id}`}
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          fontWeight: 'bold',
                                          fontSize: '1.5rem',
                                      }
                                    : { fontWeight: '400' }
                            }
                        >
                            <TooltipComponent
                                content={list.description.substring(0, 50)}
                                position='BottomRight'
                                cssClass='text-white bg-navBar bg-opacity-75 py-1 px-2 font-main'
                            >
                                <p className='uppercase'>
                                    {`${list.name.substring(0, 15)}..`}
                                </p>
                            </TooltipComponent>
                        </NavLink>{' '}
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                window.confirm(
                                    `Are you sure you want this list removed? The process will also remove the containing items..`
                                ) && runDeleteItem(list);
                            }}
                            className='w-4 h-4 text-white pb-1'
                        >
                            {' '}
                            {<BsTrash />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeftNav;
