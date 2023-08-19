import { Stack } from '@mui/material';
import ReactMarkDown from 'react-markdown';
import { articleComponents } from '../atoms/CodeText';
import { Spacer } from '../atoms/Spacer';

interface DetailTextFrameProps {
  texts: (string | number)[];
}

const DetailTextFrame: React.FC<DetailTextFrameProps> = (props) => {
  const { texts } = props;

  return (
    <Stack width={'100%'} spacing={3} sx={{ pt: 3 }} direction={'column'}>
      {texts.map((row, id) => {
        if (typeof row === 'string') {
          return (
            <ReactMarkDown
              children={row}
              components={articleComponents}
              key={id}
              linkTarget={row.includes('/practice') ? '_self' : '_blank'}
            />
          );
        } else {
          return <Spacer sizeIF={30} key={id} />;
        }
      })}
    </Stack>
  );
};

export default DetailTextFrame;
