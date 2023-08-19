import { Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';
import PageNavigation from './PageNavigation';

interface PageFrameProps {
  head?: React.ReactElement;
  children: React.ReactNode;
  loc?: number;
}

const PageFrame: React.FC<PageFrameProps> = (props) => {
  const { head, children, loc } = props;

  return (
    <Stack width={'100%'} position={'relative'} justifyContent={'center'}>
      <PageHeader />
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ mx: 0 }}
        position={'relative'}
      >
        <Grid item xs={9}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
            }}
          >
            <Stack
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ width: '100%' }}
            >
              {head}
              {children}
              {loc !== undefined && <PageNavigation loc={loc} />}
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PageFrame;
