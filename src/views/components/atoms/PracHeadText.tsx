import { Stack, Typography } from '@mui/material';
import { Spacer } from './Spacer';

interface PracHeadTextProps {
  texts: {
    h: string;
    b: string[];
  };
}

const PracHeadText: React.FC<PracHeadTextProps> = (props) => {
  const { texts } = props;
  return (
    <Stack sx={{ justifyContent: 'column', width: '100%' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '26px' }}>
        {texts.h}
      </Typography>
      <Spacer sizeIF={10} />
      {texts.b.map((row, id) => {
        return (
          <Typography
            sx={{ fontWeight: 'normal', fontSize: '14px', color: 'gray' }}
            key={id}
          >
            {row}
          </Typography>
        );
      })}
      <Spacer sizeIF={30} />
    </Stack>
  );
};

export default PracHeadText;
