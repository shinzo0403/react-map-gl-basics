import { Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const CustomDivider: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Stack sx={{ width: '100%', alignItems: 'center' }}>
        <Box sx={{ height: 2, width: '60%', backgroundColor: '#e2e2e2' }} />
      </Stack>
    </motion.div>
  );
};

export default CustomDivider;
