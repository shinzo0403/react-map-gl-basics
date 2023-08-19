import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { introTexts } from '../../../utils/introduction/IntroTexts';

const style = {
  width: 'max-content',
  textDecoration: 'underline',
  fontSize: '15px',
  ':hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
  ':active': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
};

interface PageNavigation {
  loc: number;
}

const PageNavigation: React.FC<PageNavigation> = (props) => {
  const { loc } = props;

  const navigate = useNavigate();

  return (
    <Stack
      direction={'row'}
      sx={{
        width: '100%',
        height: 200,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        disabled={loc === 0}
        sx={style}
        onClick={() => navigate(`/practice${loc - 1}`)}
      >
        {loc === 0 ? '' : introTexts[loc - 1].h}
      </Button>
      <Button
        disabled={loc === 5}
        sx={style}
        onClick={() => navigate(`/practice${loc + 1}`)}
      >
        {loc === 5 ? '' : introTexts[loc + 1].h}
      </Button>
    </Stack>
  );
};

export default PageNavigation;
