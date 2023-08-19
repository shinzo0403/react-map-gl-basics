import Prac1 from '../../practice/prac_1/Prac1';
import { markdown1 } from '../../utils/details/Text1.js';
import { introTexts } from '../../utils/introduction/IntroTexts';
import PracHeadText from '../components/atoms/PracHeadText';
import DetailTextFrame from '../components/details/DetailTextFrame';
import PageFrame from './frames/PageFrame';

const Page1: React.FC = () => {
  return (
    <PageFrame loc={1} head={<PracHeadText texts={introTexts[1]} />}>
      <Prac1 />
      <DetailTextFrame texts={markdown1} />
    </PageFrame>
  );
};

export default Page1;
