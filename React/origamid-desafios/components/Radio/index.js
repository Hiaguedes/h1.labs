import { useState } from 'react';

const Radio = ({options, checked, setChecked}) => {

    return (
        <>
            {options.map(option => {
                return(
                        <label key={option} style={{ width: '100%', fontFamily: 'monospace', fontSize: '1.5rem'}}>
                            <input style={{marginRight: '0.5rem'}} 
                                   type="radio" 
                                   value={option}
                                   checked={checked === option}
                                   onChange={() => setChecked(option)} />
                            {option}
                        </label>
                    )
            })}
        </>
    )
}
export default Radio;