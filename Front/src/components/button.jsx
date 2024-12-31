import React from 'react';



const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className='border border-white rounded-lg p-2'>
            {text}
        </button>
    );
}
export default Button;