import { markdown0 } from '../../utils/details/Text0.js';
import { introTexts } from '../../utils/introduction/IntroTexts';
import PracHeadText from '../components/atoms/PracHeadText';
import DetailTextFrame from '../components/details/DetailTextFrame';
import PageFrame from './frames/PageFrame';

const Page0: React.FC = () => {
  return (
    <PageFrame loc={0} head={<PracHeadText texts={introTexts[0]} />}>
      <DetailTextFrame texts={markdown0} />
    </PageFrame>
  );
};

export default Page0;
