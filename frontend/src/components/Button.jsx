export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    isLoading = false,
    disabled = false,
    ...rest }) {

    const baseStyle = {
        padding: '0.6rem 1.2rem',
        borderRadius: '0.375rem',
        fontWeight: '600',
        border: 'none',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.7 : 1,
        transition: 'background-color 0.2s ease',
    };

    const variants = {
        primary: { backgroundColor: '#2563eb', color: '#ffffff' },
        secondary: { backgroundColor: '#e2e8f0', color: '#0f172a' },
        danger: { backgroundColor: '#ef4444', color: '#ffffff' },
    };

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            style={{ ...baseStyle, ...variants[variant] }}
            {...rest}
        >
            {isLoading ? 'Processing...' : children}
        </button>
    );
};