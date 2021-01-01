import React, { useEffect, useState } from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './Header';
import Body from './Body';

import api from './api';

function App() {
    const [stocks, setStocks] = useState();
    const [loaded, setLoaded] = useState(false);

    // Sets up websocket connection and data stream
    api.handleDataStream(stocks, setStocks);

    useEffect( () => {
        const getQuotes = async () => {
            console.log('Getting Quote...');
            const _stocks = await api.getAllCompanyInfo();
            setStocks(_stocks);
        }
        getQuotes().then(() => {
            setLoaded(true);
        });
    }, [])
    return (
        <div className="app">
            <Header />
        {
            !loaded ? (
                <div className="progress">
                    <CircularProgress />
                </div>
            ) : (
                <Body
                    stocks={stocks}
                />
            )
        }
        </div>
    );
}

export default App;
