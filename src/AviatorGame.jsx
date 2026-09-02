import React, { useState, useEffect } from 'react';

export default function AviatorGame() {
    const [balance, setBalance] = useState(12450.00);
    const [betAmount, setBetAmount] = useState(10);
    const [multiplier, setMultiplier] = useState(1.00);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasCashedOut, setHasCashedOut] = useState(false);
    const [statusText, setStatusText] = useState('WAITING FOR NEXT ROUND');

    useEffect(() => {
        let timer;
        if (isPlaying && !hasCashedOut) {
            timer = setInterval(() => {
                setMultiplier((prev) => {
                    const nextVal = prev + 0.05;
                    if (nextVal > (Math.random() * 5 + 1.5)) {
                        clearInterval(timer);
                        setIsPlaying(false);
                        setStatusText('CRASHED! You lost the bet.');
                    }
                    return Number(nextVal.toFixed(2));
                });
            }, 100);
        }
        return () => clearInterval(timer);
    }, [isPlaying, hasCashedOut]);

    const startBet = () => {
        if (betAmount > balance) {
            alert("Wallet mein balance kam hai!");
            return;
        }
        setBalance(prev => prev - betAmount);
        setMultiplier(1.00);
        setIsPlaying(true);
        setHasCashedOut(false);
        setStatusText('PLANE IS FLYING...');
    };

    const cashOut = () => {
        if (!isPlaying || hasCashedOut) return;
        const winnings = betAmount * multiplier;
        setBalance(prev => prev + winnings);
        setHasCashedOut(true);
        setIsPlaying(false);
        setStatusText(`SUCCESS! Won $${winnings.toFixed(2)}`);
    };

    return (
        <div style={{ backgroundColor: '#121212', color: '#FFD700', padding: '20px', minHeight: '100vh', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', background: '#1c1c1c', padding: '10px', borderRadius: '8px' }}>
                <span>EXCELSIOR AVIATOR</span>
                <span><b>${balance.toFixed(2)}</b></span>
            </div>

            <div style={{ background: '#1c1c1c', border: '1px solid #FFD700', borderRadius: '10px', padding: '30px', textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#888' }}>{statusText}</div>
                <div style={{ fontSize: '42px', fontWeight: 'bold', margin: '15px 0' }}>{multiplier}x</div>
                <div style={{ fontSize: '14px', color: '#ccc' }}>✈️ Flying High</div>
            </div>

            <div style={{ background: '#1c1c1c', padding: '15px', borderRadius: '10px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '12px' }}>Bet Amount ($):</label>
                    <input 
                        type="number" 
                        value={betAmount} 
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        disabled={isPlaying}
                        style={{ width: '100%', padding: '10px', marginTop: '5px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '5px' }}
                    />
                </div>

                {!isPlaying ? (
                    <button 
                        onClick={startBet}
                        style={{ width: '100%', padding: '14px', background: '#FFD700', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        PLACE BET (${betAmount})
                    </button>
                ) : (
                    <button 
                        onClick={cashOut}
                        disabled={hasCashedOut}
                        style={{ width: '100%', padding: '14px', background: '#00ffcc', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        CASHOUT (${(betAmount * multiplier).toFixed(2)})
                    </button>
                )}
            </div>
        </div>
    );
}
