import React from 'react';

interface InputProps {
  onChange: () => void;
  type: string;
  placeholder?: string;
}

function Input({ onChange, type, placeholder }: InputProps) {
    return (
        <>
          <input type={type} placeholder={placeholder} onChange={onChange} />
        </>
    );
}

export default Input;
