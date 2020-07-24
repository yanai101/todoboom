import React from 'react'
import './todoBtn.scss'

export const TodoBtn = ({onClick , className , children, reverse}) => {

    return (
        <div className={`todoBtn ${reverse ? 'revese' : ''} ${className ? className : ''}`} onClick={(e)=>onClick && onClick(e)}>
            {children}
        </div>
    )
}
