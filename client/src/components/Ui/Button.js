import React from 'react'

const Button = ({children , type , color , onClick , disabled}) => {
  return (
    <>
        <button 
            disabled={disabled}
            type={type}
            className={`${color === 'indigo' ? `bg-indigo-800 w-full py-2 rounded-md text-white` : `bg-orange-500 w-full py-2 rounded-md text-white`}`}
            onClick={onClick}
        >
            {children}
        </button>
    </>
  )
}

export default Button