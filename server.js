const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/excelsior_gaming', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Transaction / Deposit Schema
const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    utrNumber: { type: String, required: true, unique: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Withdrawal Schema
const withdrawalSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    upiId: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});
const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);

// Deposit Submit Route
app.post('/api/deposit/submit', async (req, res) => {
    try {
        const { userId, amount, utrNumber } = req.body;
        if (!amount || !utrNumber) {
            return res.status(400).json({ success: false, message: "Amount aur UTR number zaroori hain!" });
        }

        const existingTx = await Transaction.findOne({ utrNumber });
        if (existingTx) {
            return res.status(400).json({ success: false, message: "Yeh UTR number pehle hi use ho chuka hai!" });
        }

        const newTx = new Transaction({
            userId: userId || "USER_123",
            amount,
            utrNumber,
            status: 'Pending'
        });

        await newTx.save();
        res.status(200).json({ success: true, message: "Deposit request successfully submit ho gayi hai!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
});

// Withdrawal Submit Route
app.post('/api/withdrawal/submit', async (req, res) => {
    try {
        const { userId, amount, upiId } = req.body;
        if (!amount || !upiId) {
            return res.status(400).json({ success: false, message: "Amount aur UPI ID zaroori hain!" });
        }

        const newWithdrawal = new Withdrawal({
            userId: userId || "USER_123",
            amount,
            upiId,
            status: 'Pending'
        });

        await newWithdrawal.save();
        res.status(200).json({ success: true, message: "Withdrawal request successfully submit ho gayi hai!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during withdrawal." });
    }
});

// Admin Pending Deposits Fetch Route
app.get('/api/admin/pending-deposits', async (req, res) => {
    try {
        const deposits = await Transaction.find({ status: 'Pending' });
        res.status(200).json({ success: true, deposits });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching pending deposits." });
    }
});

// Admin Approve Deposit Route
app.post('/api/admin/approve', async (req, res) => {
    try {
        const { transactionId } = req.body;
        const tx = await Transaction.findById(transactionId);
        if (!tx) {
            return res.status(404).json({ success: false, message: "Transaction nahi mili!" });
        }

        tx.status = 'Approved';
        await tx.save();

        res.status(200).json({ success: true, message: "Deposit approved successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Approval error." });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
