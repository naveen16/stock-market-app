import React from 'react'
import './Body.css'
import moment from 'moment';
import StockRow from './StockRow';

function Body({stocks}) {
    return (
        <div className="body">
            <div className="body__date">
                <h1>{moment().format('MMMM, DD YYYY')}</h1>
            </div>
            <div className="body__list">
                {Object.values(stocks).map(stock => (
                    <StockRow
                        key={stock.ticker} 
                        price={stock.price} 
                        logo={stock.logo} 
                        ticker={stock.ticker}
                        name={stock.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Body
