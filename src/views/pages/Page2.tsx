import Prac2 from '../../practice/prac_2/Prac2';
import { markdown2 } from '../../utils/details/Text2';
import { introTexts } from '../../utils/introduction/IntroTexts';
import PracHeadText from '../components/atoms/PracHeadText';
import DetailTextFrame from '../components/details/DetailTextFrame';
import PageFrame from './frames/PageFrame';

const Page2: React.FC = () => {
  return (
    <PageFrame loc={2} head={<PracHeadText texts={introTexts[2]} />}>
      <Prac2 />
      <DetailTextFrame texts={markdown2} />
    </PageFrame>
  );
};

export default Page2;
