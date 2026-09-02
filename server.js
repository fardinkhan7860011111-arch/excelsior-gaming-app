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

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    utrNumber: { type: String, required: true, unique: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

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

app.listen(5000, () => console.log("Server running on port 5000"));
