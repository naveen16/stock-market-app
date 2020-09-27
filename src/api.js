const baseUrl = `https://finnhub.io/api/v1`;
const api_key = 'btj3uvv48v6p9f1pq0h0';

const symbols = [
    'AAPL', 'AMZN', 'GOOGL', 'MSFT', 'FB', 'NFLX', 'TSLA', 'UBER', 'LYFT', 'FDX', 'UPS'
]

const getQuote = async (symbol) => {
    const url = `${baseUrl}/quote?symbol=${symbol}&token=${api_key}`;
    const options = {
        method: 'GET',
    };
    const response = await fetch(url, options);
    return response.json();
}

const getCompanyInfo = async (symbol) => {
    const url = `${baseUrl}/stock/profile2?symbol=${symbol}&token=${api_key}`;
    const options = {
        method: 'GET'
    };
    const response = await fetch(url, options);
    return response.json();
}

const getAllCompanyInfo = async () => {
    const response = {};
    for (const symbol of symbols) {
        const price = await getQuote(symbol);
        const {logo, ticker, name} = await getCompanyInfo(symbol);
        response[`${symbol}`] = {
            logo,
            ticker,
            name,
            price: price.c.toFixed(2)
        }
    }
    console.log('STOCKS', response)
    return response;
}

/**
 * Subscribe to finnhub api websocket to get quotes and company info for specific tickers
 * We pass in the react useState hook values to update the stocks displayed
 * @param {*} stocks 
 * @param {*} setStocks 
 */
const handleDataStream = (stocks, setStocks) => {
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${api_key}`)
    ws.onopen = () => {
        //ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
        ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
        ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}));
        ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'GOOGL'}));
        ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}));
        ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'FB'}));
        ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'NFLX'}));
        ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}));
    }
    ws.onmessage = e => {
        const data = JSON.parse(e.data);
        if (data.data && data.data.length > 0) {
            const symbol = data.data[0].s;
            console.log(`${symbol} ${data.data[0].p}`);
            const updatedStocks = {...stocks};
            if (updatedStocks && symbol) {
                updatedStocks[`${symbol}`].price = data.data[0].p.toFixed(2);
            }
            setStocks(updatedStocks);
        }
    }
}

export default ({
    getQuote,
    getCompanyInfo,
    getAllCompanyInfo,
    handleDataStream
})