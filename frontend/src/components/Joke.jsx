import React from 'react';
import axios from 'axios';
import { Spinner } from '@syncfusion/ej2-react-popups';

const Joke = () => {
    const [joke, setJoke] = React.useState({});

    const fetchJoke = async () => {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
        setJoke(response.data);
    };

    React.useEffect(() => {}, [joke]);

    return (
        <div className='flex flex-row space-x-6'>
            <button className='button text-sm' onClick={(e) => fetchJoke()}>
                {' '}
                Click me for a joke
            </button>
            <div className='text-sm'>
                <p>{joke.setup}</p>
                <p>{joke.delivery}</p>
            </div>
        </div>
    );
};

export default Joke;
