import { Stack } from '@mui/material';

interface CodeAreaProps {
  children: React.ReactNode;
}

const CArea: React.FC<CodeAreaProps> = (props) => {
  const { children } = props;

  return (
    <Stack
      direction={'column'}
      sx={{ width: 'auto', background: 'rgba(14,33,39,.05)', p: 2 }}
    >
      {children}
    </Stack>
  );
};

export default CArea;
