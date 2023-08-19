import { Box, Stack, Typography } from '@mui/material';

interface IntroHTextProps {
  h: string;
}

export const IntroHText: React.FC<IntroHTextProps> = (props) => {
  return (
    <Stack sx={{ m: 0, p: 0 }} direction={'column'} spacing={3}>
      <Typography sx={{ fontSize: '27px', fontWeight: 'bold', width: '100%' }}>
        {props.h}
      </Typography>
      <Box sx={{ height: 2, width: 80, backgroundColor: '#c0c0c0' }} />
    </Stack>
  );
};

interface IntroBTextProps {
  b: string[];
}

export const IntroBText: React.FC<IntroBTextProps> = (props) => {
  return (
    <>
      {props.b.map((row, id) => {
        return (
          <Typography
            sx={{
              fontSize: '17px',
              overflowWrap: 'break-word',
              lineHeight: 1.4,
              mt: id === 0 ? 5 : 2,
            }}
            key={id}
          >
            {row}
          </Typography>
        );
      })}
    </>
  );
};
