import React, { useState } from 'react';
import axios from 'axios';

export default function DepositScreen() {
    const [amount, setAmount] = useState('');
    const [utrNumber, setUtrNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const merchantInfo = {
        name: "Fardin Khan",
        bank: "Bank of Baroda 6232",
        upiId: "fardinkhan7860011111@okhdfcbank",
        qrImagePath: "/assets/images/fardin_qr.jpg"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !utrNumber) {
            alert("Amount aur UTR number bharein!");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/deposit/submit', {
                amount: Number(amount),
                utrNumber: utrNumber
            });

            if (res.data.success) {
                alert(res.data.message);
                setAmount('');
                setUtrNumber('');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Kuch galat ho gaya!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#121212', color: '#FFD700', padding: '20px', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>EXCELSIOR - Instant Deposit</h2>

            <div style={{ background: '#1c1c1c', border: '1px solid #FFD700', borderRadius: '10px', padding: '20px', maxWidth: '400px', margin: '0 auto 20px auto' }}>
                <p><strong>Name:</strong> {merchantInfo.name}</p>
                <p><strong>Bank:</strong> {merchantInfo.bank}</p>
                <p><strong>UPI ID:</strong> {merchantInfo.upiId}</p>

                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <img 
                        src={merchantInfo.qrImagePath} 
                        alt="Fardin Khan QR Code" 
                        style={{ width: '180px', height: '180px', borderRadius: '8px', border: '2px solid #FFD700' }} 
                    />
                    <p style={{ fontSize: '12px', color: '#ccc', marginTop: '8px' }}>Scan to pay using any UPI app</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Deposit Amount:</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount"
                        style={{ width: '100%', padding: '12px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '5px' }}
                        required 
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>UTR / Reference Number (12 digits):</label>
                    <input 
                        type="text" 
                        value={utrNumber} 
                        onChange={(e) => setUtrNumber(e.target.value)} 
                        placeholder="Enter 12-digit UTR"
                        style={{ width: '100%', padding: '12px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '5px' }}
                        required 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ width: '100%', padding: '14px', background: '#FFD700', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {loading ? "Submitting..." : "CONFIRM DEPOSIT"}
                </button>
            </form>
        </div>
    );
}


