import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Stack,
} from '@mui/material';
import { SetStateAction } from 'react';
import btnStyle from '../../styles/MapButtonStyle';
import stcStyle from '../../styles/MapStackStyle';

const inter_row = [
  'dragRotate',
  'dragPan',
  'doubleClickZoom',
  'touchPitch',
  'touchZoomRotate',
  'scrollZoom',
] as const;
const inter_row_ty = [...inter_row];

export type inter_type = {
  [T in typeof inter_row[number]]: boolean;
};

interface ControlPanelProps {
  setInter: React.Dispatch<SetStateAction<inter_type>>;
  interState: inter_type;
  setFly: React.Dispatch<SetStateAction<boolean>>;
  fly: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  setInter,
  interState,
  setFly,
  fly,
}) => {
  return (
    <Stack sx={stcStyle} spacing={3}>
      <FormControl sx={{ ml: 1.5 }}>
        <FormLabel sx={{ mb: 1 }}>interaction</FormLabel>
        <RadioGroup>
          {inter_row_ty.map((elm, id) => {
            return (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={interState[`${elm}`]}
                    sx={{ width: 20, height: 20, mr: 1 }}
                    onClick={() =>
                      setInter({
                        ...interState,
                        [`${elm}`]: !interState[`${elm}`],
                      })
                    }
                  />
                }
                label={elm}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Button onClick={() => setFly(!fly)} sx={btnStyle}>
        fly !
      </Button>
    </Stack>
  );
};

export default ControlPanel;
