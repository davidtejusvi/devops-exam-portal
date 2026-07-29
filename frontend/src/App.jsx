import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRouter from './router';

const App = () => (
    <>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppRouter />
    </>
);

export default App;
