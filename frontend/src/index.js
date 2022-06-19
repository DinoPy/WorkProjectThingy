import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import config from './config.json';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
    'ORg4AjUWIQA/Gnt2VVhhQlFacF9JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkNiUH9Zcn1QQ2ZbVkE='
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
