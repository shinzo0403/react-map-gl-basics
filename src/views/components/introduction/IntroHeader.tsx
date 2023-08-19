import { Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const IntroHeader: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ height: 200 }}>
        <motion.div
          initial={{ opacity: 0, y: '5%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Stack direction={'column'}>
            <Typography
              sx={{
                mt: 2,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '30px',
              }}
            >
              React × MapBox-GL 基礎まとめ
            </Typography>
            <Typography
              sx={{
                mt: 4,
                width: '100%',
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              このページでは、『React』『TypeScript』『MapBox-GL』『React-Map-GL』を中心に、
            </Typography>
            <Typography
              sx={{
                mt: 2,
                width: '100%',
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              フロントエンドでマップを描画するための基本的なコードを学ぶことができます。
            </Typography>
          </Stack>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default IntroHeader;
