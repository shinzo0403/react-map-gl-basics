import { Button } from '@mui/material';
import { SetStateAction } from 'react';
import btnstyle, { MapAbs } from '../../styles/MapButtonStyle';

interface LibButtonProps {
  onSwitch: React.Dispatch<SetStateAction<boolean>>;
  switcher: boolean;
}

const LibButton: React.FC<LibButtonProps> = (props) => {
  const { onSwitch, switcher } = props;
  return (
    <Button sx={{ ...btnstyle, ...MapAbs }} onClick={() => onSwitch(!switcher)}>
      bounds
    </Button>
  );
};

export default LibButton;
