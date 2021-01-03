import React, { useEffect, useState } from 'react';
import './StockRow.css'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';


function StockRow({classes, logo, ticker, name, price, openPrice}) {
    const [isVisible, setVisible] = useState(false);
    const priceStyle = {
        opacity: isVisible ? '1' : '0',
    }

    useEffect(() => {
        setVisible(false);
        setTimeout(() => {
            setVisible(true);
        }, 500);
    }, [price])

    const priceChange = (openPrice, price) => {
        const change = ((price - openPrice) / 100).toFixed(2);
        return `${change}%`;
    }

    return (
        <div className="stockRow">
            <div className="stockRow__info">
                {/* <img className="stockRow__logo" src={logo} alt={ticker} /> */}
                <div className="stockRow__data">
                    <div>{ticker}</div>
                    <p>{name}</p>
                </div>
            </div>
            <div className="stockRow__price" style={priceStyle} >
                <div className="price_value">{isNaN(price) ? '?' : `$${price.toFixed(2)}`}</div>
                <div className="price_change">
                    {
                        (price >= openPrice) ?
                        <div className="upwardPriceChange">
                            <Icon className={classes.upArrow}>
                                <ArrowUpwardIcon fontSize="small"/>
                            </Icon>
                            {priceChange(openPrice, price)}
                        </div>
                            :
                        <div className="downwardPriceChange">
                            <Icon className={classes.downArrow}>
                                <ArrowDownwardIcon fontSize="small"/>
                            </Icon>
                            {priceChange(openPrice, price)}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const styles = theme => ({
    upArrow: {
        color: 'green',
        position: 'relative',
        top: '5px'
    },
    downArrow: {
        color: 'red',
        position: 'relative',
        top: '5px'
    }
});

export default withStyles(styles)(StockRow);
