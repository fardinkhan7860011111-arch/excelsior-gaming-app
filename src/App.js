import React, { useState } from 'react';
import GameLobby from './GameLobby';
import DepositScreen from './DepositScreen';
import WithdrawalScreen from './WithdrawalScreen';
import AviatorGame from './AviatorGame';
import MinesGame from './MinesGame';
import AdminDashboard from './AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('lobby');

  return (
    <div>
      {currentScreen === 'lobby' && <GameLobby navigateTo={(screen) => setCurrentScreen(screen)} />}
      {currentScreen === 'deposit' && <DepositScreen />}
      {currentScreen === 'withdrawal' && <WithdrawalScreen />}
      {currentScreen === 'aviator' && <AviatorGame />}
      {currentScreen === 'mines' && <MinesGame />}
      {currentScreen === 'admin' && <AdminDashboard />}

      {/* Temporary navigation helper bar for testing */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#222', padding: '5px', display: 'flex', justifyContent: 'space-around', zIndex: 1000 }}>
        <button onClick={() => setCurrentScreen('lobby')} style={{ background: '#FFD700', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Lobby</button>
        <button onClick={() => setCurrentScreen('deposit')} style={{ background: '#FFD700', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Deposit</button>
        <button onClick={() => setCurrentScreen('withdrawal')} style={{ background: '#FFD700', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Withdraw</button>
        <button onClick={() => setCurrentScreen('aviator')} style={{ background: '#FFD700', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Aviator</button>
        <button onClick={() => setCurrentScreen('mines')} style={{ background: '#FFD700', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Mines</button>
        <button onClick={() => setCurrentScreen('admin')} style={{ background: '#FFD700', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Admin</button>
      </div>
    </div>
  );
  }
                                                
