import React from 'react';
import { Box, Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import styled from '@emotion/styled';

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'color',
})<ChipProps>`
  height: 1.25rem;
  border-radius: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0 0.25rem;
  color: ${({ color }) => (color === 'success' ? '#216E4E' : 'rgba(0,0,0,0.87)')};
  background-color: ${({ color }) => (color === 'success' ? '#DCFFF1' : 'rgba(0,0,0,0.08)')};
`;

const Tag: React.FC<ChipProps> = ({ ...chipProps }) => {
  return (
    <Box>
      <StyledChip variant="filled" {...chipProps} />
    </Box>
  );
};

export default Tag;
