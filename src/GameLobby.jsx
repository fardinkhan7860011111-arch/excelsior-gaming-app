import React from 'react';

export default function GameLobby({ navigateTo }) {
    return (
        <div style={{ backgroundColor: '#0d0d0d', color: '#FFD700', padding: '15px', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '70px' }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px' }}>EXCELSIOR</div>
                <button 
                    onClick={() => navigateTo('wallet')}
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#000', border: 'none', padding: '8px 18px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                >
                    DEPOSIT
                </button>
            </div>

            {/* Daily Lucky Wheel Banner */}
            <div style={{ background: 'linear-gradient(135deg, #2a2100, #161616)', border: '1px solid #FFD700', borderRadius: '12px', padding: '15px', marginBottom: '20px', position: 'relative' }}>
                <div style={{ fontSize: '10px', color: '#FFA500', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>PROMOTION</div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>Daily Lucky Wheel</h3>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 10px 0' }}>Spin for a chance to win up to 1 BTC instantly.</p>
                <div style={{ width: '32px', height: '32px', background: '#FFD700', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>▶</div>
            </div>

            {/* Explore Markets */}
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>Explore Markets</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div onClick={() => navigateTo('aviator')} style={{ background: '#171717', border: '1px solid #333', borderRadius: '10px', padding: '15px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}>🚀</div>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Originals</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>Provably Fair</div>
                </div>
                <div style={{ background: '#171717', border: '1px solid #333', borderRadius: '10px', padding: '15px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}>🎰</div>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Slots</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>High RTP</div>
                </div>
                <div style={{ background: '#171717', border: '1px solid #333', borderRadius: '10px', padding: '15px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}>🃏</div>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Live Tables</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>Real Dealers</div>
                </div>
                <div onClick={() => navigateTo('aviator')} style={{ background: '#171717', border: '1px solid #333', borderRadius: '10px', padding: '15px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}>📈</div>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Crash Games</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>Multipliers</div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#121212', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 }}>
                <div onClick={() => navigateTo('lobby')} style={{ textAlign: 'center', fontSize: '10px', color: '#FFD700', cursor: 'pointer' }}>🏠<br/>Lobby</div>
                <div onClick={() => navigateTo('casino')} style={{ textAlign: 'center', fontSize: '10px', color: '#888', cursor: 'pointer' }}>🎲<br/>Casino</div>
                <div onClick={() => navigateTo('wallet')} style={{ textAlign: 'center', fontSize: '10px', color: '#888', cursor: 'pointer' }}>💳<br/>Wallet</div>
                <div onClick={() => navigateTo('vip')} style={{ textAlign: 'center', fontSize: '10px', color: '#888', cursor: 'pointer' }}>🏆<br/>VIP</div>
                <div onClick={() => navigateTo('profile')} style={{ textAlign: 'center', fontSize: '10px', color: '#888', cursor: 'pointer' }}>👤<br/>Profile</div>
            </div>
        </div>
    );
}


