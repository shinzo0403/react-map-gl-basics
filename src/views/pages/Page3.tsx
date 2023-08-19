import Prac3 from '../../practice/prac_3/Prac3';
import { markdown3 } from '../../utils/details/Text3';
import { introTexts } from '../../utils/introduction/IntroTexts';
import PracHeadText from '../components/atoms/PracHeadText';
import DetailTextFrame from '../components/details/DetailTextFrame';
import PageFrame from './frames/PageFrame';

const Page3: React.FC = () => {
  return (
    <PageFrame loc={3} head={<PracHeadText texts={introTexts[3]} />}>
      <Prac3 />
      <DetailTextFrame texts={markdown3} />
    </PageFrame>
  );
};

export default Page3;
