import React from 'react';
import { ButtonBase, TextContentStyle } from './styles'

const Button = ({children, ...props}) => {
    return (
        <div style={{display: 'inline-block'}}>
            <ButtonBase {...props}>
                <TextContentStyle>{children}</TextContentStyle>
            </ButtonBase>
        </div>
    );
}

export default Button ;
