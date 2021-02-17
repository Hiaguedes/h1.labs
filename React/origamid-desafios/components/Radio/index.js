import { useState } from 'react';

const Radio = ({options, checked, setChecked}) => {

    return (
        <>
            {options.map(option => {
                return(
                        <label style={{ width: '100%'}}>
                            <input style={{marginRight: '0.5rem'}} 
                                   type="radio" 
                                   name={options}
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