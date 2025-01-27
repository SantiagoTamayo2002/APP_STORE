import React from 'react';

const Button = ({ text, onClick, color }) => {
    return (
        <button 
            onClick={onClick} 
            className={`rounded-lg p-2 m-1 ${color ? `bg-${color}` : ''}`}
            style={{ 
                backgroundColor: color || 'transparent', 
                border: `1px solid ${color || 'white'}` 
            }}
        >
            {text}
        </button>
    );
}

export default Button;
