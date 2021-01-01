const baseUrl = `https://finnhub.io/api/v1`;
const api_key = 'btj3uvv48v6p9f1pq0h0';

const symbols = [
    'AAPL', 'AMZN', 'GOOGL', 'MSFT', 'FB', 'NFLX', 'TSLA', 'UBER', 'LYFT', 'FDX', 'UPS'
]
const BTC = 'BINANCE:BTCUSDT';

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
    const [quotes, info] = await Promise.all([
        Promise.all(symbols.map((symbol) => getQuote(symbol))),
        Promise.all(symbols.map((symbol) => getCompanyInfo(symbol)))
    ]);
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        const [price, {logo, ticker, name}] = [quotes[i], info[i]];
        response[`${symbol}`] = {
            logo,
            ticker,
            name,
            price: price.c?.toFixed(2)
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
        symbols.forEach((symbol) => {
            ws.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}));
        })
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