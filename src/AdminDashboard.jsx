import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [pendingDeposits, setPendingDeposits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingDeposits();
    }, []);

    const fetchPendingDeposits = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/pending-deposits');
            setPendingDeposits(res.data.deposits || []);
        } catch (err) {
            console.error("Error fetching deposits", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (transactionId) => {
        try {
            const res = await axios.post('http://localhost:5000/api/admin/approve', { transactionId });
            if (res.data.success) {
                alert("Deposit Approved successfully!");
                fetchPendingDeposits();
            }
        } catch (err) {
            alert("Approval failed!");
        }
    };

    return (
        <div style={{ backgroundColor: '#0d0d0d', color: '#FFD700', padding: '20px', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #FFD700', paddingBottom: '10px', marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>EXCELSIOR STAFF ONLY</span>
                <button style={{ background: '#FFD700', color: '#000', border: 'none', padding: '5px 12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>LOGOUT</button>
            </div>

            {/* Live Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ background: '#161616', border: '1px solid #333', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#aaa' }}>ACTIVE SESSIONS</div>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '5px' }}>2,408</div>
                </div>
                <div style={{ background: '#161616', border: '1px solid #333', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#aaa' }}>24H TURNOVER</div>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '5px' }}>$1.2M</div>
                </div>
            </div>

            {/* Pending Deposits Section */}
            <div style={{ background: '#161616', border: '1px solid #333', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: '0', fontSize: '14px' }}>Pending Deposits</h3>
                    <span style={{ background: '#332900', color: '#FFD700', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', border: '1px solid #FFD700' }}>
                        {pendingDeposits.length} Awaiting
                    </span>
                </div>

                {loading ? <p style={{ fontSize: '12px' }}>Loading...</p> : pendingDeposits.length === 0 ? (
                    <p style={{ fontSize: '12px', color: '#888' }}>No pending deposits right now.</p>
                ) : (
                    pendingDeposits.map((tx) => (
                        <div key={tx._id} style={{ background: '#111', border: '1px solid #444', padding: '12px', borderRadius: '6px', marginBottom: '10px' }}>
                            <div style={{ fontSize: '12px', marginBottom: '5px' }}><strong>User ID:</strong> {tx.userId}</div>
                            <div style={{ fontSize: '12px', marginBottom: '5px' }}><strong>Amount:</strong> ${tx.amount}</div>
                            <div style={{ fontSize: '12px', marginBottom: '10px', color: '#00ffcc' }}><strong>UTR:</strong> {tx.utrNumber}</div>
                            <button 
                                onClick={() => handleApprove(tx._id)}
                                style={{ width: '100%', background: '#FFD700', color: '#000', border: 'none', padding: '8px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                            >
                                APPROVE & ADD BALANCE
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

