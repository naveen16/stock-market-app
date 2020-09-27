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
        console.log('IN USE EFFECT');
        const getQuotes = async () => {
            //await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('...GETTING QUOTE');
            const _stocks = await api.getAllCompanyInfo();
            setStocks(_stocks);
        }
        getQuotes().then(() => {
            setLoaded(true);
        });
    }, [])
    return (
        <div className="App">
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
