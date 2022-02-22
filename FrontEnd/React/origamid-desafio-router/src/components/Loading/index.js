import React from 'react';
import { MoonLoader } from 'react-spinners'
import { css } from 'styled-components';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = ({loading}) => {
    return (
        <MoonLoader color="#8A2BE2" css={override} loading={loading} size={50} />
    );
}

export default Loader;
