import { Button } from '@mui/material';
import { SetStateAction } from 'react';
import btnstyle, { MapAbs } from '../../styles/MapButtonStyle';

interface VisibleButtonProps {
  onVisible: React.Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

const VisibleButton: React.FC<VisibleButtonProps> = (props) => {
  const { onVisible, visible } = props;
  return (
    <Button sx={{ ...btnstyle, ...MapAbs }} onClick={() => onVisible(!visible)}>
      Visible
    </Button>
  );
};

export default VisibleButton;
