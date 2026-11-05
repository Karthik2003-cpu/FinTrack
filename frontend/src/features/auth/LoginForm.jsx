import { useState } from "react";
import useAuth from '../../hooks/useAuth.js';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';

export default function LoginForm({ onSwitchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const { login, isLoggingIn, loginError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!email || !password) {
            setLocalError('Please enter both email and password');
            return;
        }

        try {
            await login(email, password);
        } catch (err) {

        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '2rem auto',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            backgroundColor: '#ffffff'
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>Welcome Back!</h2>
            {(localError || loginError) && <div
                style={{
                    backgroundColor: '#fef2f2',
                    color: '#ef4444',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}
            >{localError || loginError}</div>}

            <form onSubmit={handleSubmit}>
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </form>

            <Button type="submit" isLoading={isLoggingIn} style={{ width: '100%', marginTop: '0.5rem' }}>Log In</Button>

            <p style={{
                marginTop: '1.5rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#64748b'
            }}> Don't have an account?{' '} <span onClick={onSwitchToRegister}
                style={{
                    color: '#2563eb',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}> Sign Up </span> </p>
        </div>
    );
}