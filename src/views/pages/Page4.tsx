import Prac4 from '../../practice/prac_4/Prac4';
import { markdown4 } from '../../utils/details/Text4';
import { introTexts } from '../../utils/introduction/IntroTexts';
import PracHeadText from '../components/atoms/PracHeadText';
import DetailTextFrame from '../components/details/DetailTextFrame';
import PageFrame from './frames/PageFrame';

const Page4: React.FC = () => {
  return (
    <PageFrame loc={4} head={<PracHeadText texts={introTexts[4]} />}>
      <Prac4 />
      <DetailTextFrame texts={markdown4} />
    </PageFrame>
  );
};

export default Page4;
