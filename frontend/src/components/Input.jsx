export default function Input({ label, error, type = 'text', className = '', ...rest }) {
    return (
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {label && <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{label}</label>}
            <input type={type}
                style={{ 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: '0.375rem', 
                    border: error ? '1px solid #ef4444' : '1px solid #cbd5e1', 
                    outline: 'none', 
                }}
                {...rest} />

            {error && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{error}</span>}
        </div>
    );
};