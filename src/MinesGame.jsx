import React, { useState } from 'react';

export default function MinesGame() {
    const [balance, setBalance] = useState(12450.00);
    const [betAmount, setBetAmount] = useState(10);
    const [minesCount, setMinesCount] = useState(3);
    const [gameStarted, setGameStarted] = useState(false);
    const [revealed, setRevealed] = useState(Array(25).fill(false));
    const [status, setStatus] = useState('Find the gems, avoid the mines.');

    const startGame = () => {
        if (betAmount > balance) {
            alert("Wallet mein balance kam hai!");
            return;
        }
        setBalance(prev => prev - betAmount);
        setGameStarted(true);
        setRevealed(Array(25).fill(false));
        setStatus('Game started! Pick a tile.');
    };

    const handleTileClick = (index) => {
        if (!gameStarted || revealed[index]) return;

        const newRevealed = [...revealed];
        newRevealed[index] = true;
        setRevealed(newRevealed);

        // Random chance of hitting a mine (simulated)
        if (Math.random() < (minesCount / 25)) {
            setStatus('BOOM! You hit a mine.');
            setGameStarted(false);
        } else {
            setStatus('Nice! Safe diamond found.');
        }
    };

    return (
        <div style={{ backgroundColor: '#0d0d0d', color: '#FFD700', padding: '20px', minHeight: '100vh', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', background: '#161616', padding: '12px', borderRadius: '8px', border: '1px solid #333' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>EXCELSIOR MINES</span>
                <span style={{ fontSize: '14px' }}><b>${balance.toFixed(2)}</b></span>
            </div>

            <div style={{ background: '#161616', border: '1px solid #333', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '11px', color: '#aaa' }}>Bet Amount ($):</label>
                    <input 
                        type="number" 
                        value={betAmount} 
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        disabled={gameStarted}
                        style={{ width: '100%', padding: '10px', marginTop: '5px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '11px', color: '#aaa' }}>Mines (1-24):</label>
                    <select 
                        value={minesCount} 
                        onChange={(e) => setMinesCount(Number(e.target.value))}
                        disabled={gameStarted}
                        style={{ width: '100%', padding: '10px', marginTop: '5px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '5px' }}
                    >
                        <option value={1}>1 Mine</option>
                        <option value={3}>3 Mines</option>
                        <option value={5}>5 Mines</option>
                        <option value={10}>10 Mines</option>
                    </select>
                </div>

                {!gameStarted ? (
                    <button 
                        onClick={startGame}
                        style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        START GAME
                    </button>
                ) : (
                    <div style={{ textAlign: 'center', fontSize: '12px', color: '#00ffcc', fontWeight: 'bold' }}>
                        GAME IN PROGRESS...
                    </div>
                )}
            </div>

            {/* Mines Grid (5x5) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '15px' }}>
                {revealed.map((isRev, index) => (
                    <div 
                        key={index}
                        onClick={() => handleTileClick(index)}
                        style={{ 
                            aspectRatio: '1', 
                            background: isRev ? '#222' : '#171717', 
                            border: '1px solid #333', 
                            borderRadius: '6px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            cursor: gameStarted ? 'pointer' : 'default',
                            fontSize: '18px'
                        }}
                    >
                        {isRev ? '💎' : '❓'}
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
                {status}
            </div>
        </div>
    );
}

