import React from 'react';
import { headerImages } from '../../assets/headers/headerImages';
import { introTexts } from '../../utils/introduction/IntroTexts';
import IntroCard from '../components/introduction/IntroCard';
import IntroHeader from '../components/introduction/IntroHeader';
import { IntroBText, IntroHText } from '../components/introduction/IntroText';
import PageFrame from './frames/PageFrame';

const Home: React.FC = () => {
  return (
    <PageFrame head={<IntroHeader />}>
      {introTexts.map((row, id) => {
        return (
          <IntroCard
            htext={<IntroHText h={row.h} />}
            btext={<IntroBText b={row.b} />}
            nav={id}
            delay={id}
            key={id}
            image={headerImages[id]}
          />
        );
      })}
    </PageFrame>
  );
};

export default Home;
