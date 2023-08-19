import Prac5 from '../../practice/prac_5/Prac5';
import { markdown5 } from '../../utils/details/Text5';
import { introTexts } from '../../utils/introduction/IntroTexts';
import PracHeadText from '../components/atoms/PracHeadText';
import DetailTextFrame from '../components/details/DetailTextFrame';
import PageFrame from './frames/PageFrame';

const Page5: React.FC = () => {
  return (
    <PageFrame loc={5} head={<PracHeadText texts={introTexts[5]} />}>
      <Prac5 />
      <DetailTextFrame texts={markdown5} />
    </PageFrame>
  );
};

export default Page5;
