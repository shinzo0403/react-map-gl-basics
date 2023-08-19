import { KeyboardArrowLeft } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spacer } from '../../components/atoms/Spacer';

const PageHeader: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        px: 'calc(100% / 8)',
        width: 'calc(100% * 3 / 4)',
        backgroundColor: 'white',
        zIndex: 1000,
        height: 50,
        mb: '50px',
        borderBottom: '1px solid #4169e1',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          mt: 1,
          mb: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        direction={'row'}
      >
        {location.pathname === '/' ? (
          <Spacer sizeIF={1} />
        ) : (
          <Button
            onClick={() => navigate('/')}
            sx={{
              width: 200,
              justifyContent: 'flex-start',
              ':hover': { backgroundColor: 'transparent' },
              ':active': { backgroundColor: 'transparent' },
            }}
          >
            <KeyboardArrowLeft sx={{ mr: 2 }} />
            Back
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default PageHeader;
