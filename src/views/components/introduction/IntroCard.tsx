import { Box, Button, Grid, Stack } from '@mui/material';
import { useAnimation } from 'framer-motion';
import React from 'react';
import { GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

interface IntroCardProps {
  htext: React.ReactElement;
  btext: React.ReactElement;
  nav: number;
  delay: number;
  image: string;
}

const IntroCard: React.FC<IntroCardProps> = (props) => {
  const { htext, btext, nav, image } = props;
  const navigate = useNavigate();

  const control = useAnimation();

  const handleClick = () => {
    navigate(`/practice${nav}`);
  };

  React.useEffect(() => {
    control.start({
      opacity: 1,
      y: '0%',
    });
  }, [control]);

  return (
    <Grid
      container
      sx={{
        maxWidth: 1400,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
        mx: 3,
      }}
    >
      <Grid item xs={6}>
        <Stack
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          direction={'row'}
        >
          <Box
            sx={{
              width: '90%',
              height: 400,
              backgroundImage: image ? `url(${image})` : '',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: !image ? '#f5f5f5' : 'transparent',
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack
          direction={'column'}
          sx={{
            width: '100%',
            height: 400,
            justifyContent: 'space-between',
          }}
        >
          <Stack
            direction={'column'}
            sx={{ width: '100%', justifyContent: 'space-between' }}
          >
            {htext}
            {btext}
          </Stack>
          <Stack sx={{ width: '100%' }} direction={'row-reverse'}>
            <Button
              variant='outlined'
              sx={{ width: 150, height: 50, textTransform: 'none' }}
              onClick={handleClick}
            >
              detail
              <GrNext style={{ marginLeft: 7, color: 'blue', width: 10 }} />
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default IntroCard;
