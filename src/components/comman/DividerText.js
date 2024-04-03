import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

// *** align **** 
//  1. center
//  2. left 
//  3. right


// size 
// 1. normal (default) 
// 2. small
export function DividerText({ align, label }) {
  return (
    <Root>
      <Divider textAlign={align}>{label}</Divider>
    </Root>
  );
}

export function DividerTextShip({ align, size, label }) {
  return (
    <Divider TextAlign={align}>
      <Chip label={label} size={size} />
    </Divider>
  );
}