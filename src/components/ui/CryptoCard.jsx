import React from 'react';
import PropTypes from 'prop-types';
import './CryptoCard.css'; // Zorg ervoor dat je een CSS-bestand maakt voor styling

const CryptoCard = ({ name, symbol, price, change, marketCap }) => {
    return (
        <div className="crypto-card">
            <h2 className="crypto-name">{name} ({symbol})</h2>
            <p className="crypto-price">Price: ${price.toLocaleString()}</p>
            <p className={`crypto-change ${change >= 0 ? 'positive' : 'negative'}`}>
                Change: {change >= 0 ? '+' : ''}{change}%
            </p>
            <p className="crypto-marketcap">Market Cap: ${marketCap.toLocaleString()}</p>
        </div>
    );
};

CryptoCard.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    marketCap: PropTypes.number.isRequired,
};

export default CryptoCard;