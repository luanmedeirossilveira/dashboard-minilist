import { Typography } from '@mui/material';
import React from 'react';

import { Button } from './Styles';

interface ButtonLinkProps {
  id?: string;
  label: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ label }) => {
  return (
    <Button className="quick-nav-item clear-button">
      <Typography className="quick-nav-item-label">{label}</Typography>
    </Button>
  );
};
