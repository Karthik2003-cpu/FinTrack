import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
    },
    currency: {
        type: String,
        default: 'INR'
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;