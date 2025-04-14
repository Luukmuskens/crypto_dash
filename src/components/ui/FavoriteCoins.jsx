import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const FavoriteCoins = () => {
    const [favorites, setFavorites] = useState([]);
    const [coinInput, setCoinInput] = useState("");

    const handleAddCoin = () => {
        const trimmedCoinInput = coinInput.trim();
        if (trimmedCoinInput && !favorites.includes(trimmedCoinInput)) {
            setFavorites([...favorites, trimmedCoinInput]);
            setCoinInput("");
        }
    };

    const handleRemoveCoin = (coin) => {
        setFavorites(favorites.filter((fav) => fav !== coin));
    };

    return (
        <div>
            <h2>Favorite Coins</h2>
            <div>
                <input
                    type="text"
                    value={coinInput}
                    onChange={(e) => setCoinInput(e.target.value)}
                    placeholder="Add a coin"
                />
                <button onClick={handleAddCoin}>Add</button>
            </div>
            <ul>
                {favorites.map((coin) => (
                    <li key={coin} style={{ display: "flex", alignItems: "center" }}>
                        <span>{coin}</span>
                        <button
                            onClick={() => handleRemoveCoin(coin)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                marginLeft: "8px",
                            }}
                        >
                            <FaStar color="gold" />
                        </button>
                    </li>
                ))}
            </ul>
            {favorites.length === 0 && <p>No favorite coins added yet.</p>}
        </div>
    );
};

export default FavoriteCoins;