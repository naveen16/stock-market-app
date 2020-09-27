import React from 'react'
import './StockRow.css'

function StockRow({logo, ticker, name, price}) {
    return (
        <div className="stockRow">
            <div className="stockRow__info">
                <img className="stockRow__logo" src={logo} alt="" />
                <div className="stockRow__data">
                    <h1>{ticker}</h1>
                    <p>{name}</p>
                </div>
            </div>
            <div className="stockRow__price">
                <p>${price}</p>
            </div>
        </div>
    )
}

export default StockRow
