import { Profile } from '../componentes/profile';
import { ExperienceBar } from "../componentes/experienceBar";
import style from '../styles/pages/home.module.css'
import { CompletedChallenges } from '../componentes/completedChallenges';
import { CountDown } from '../componentes/countDown';
import Head from 'next/head'
import { ChallengeBox } from '../componentes/challengeBox';
import { CountDownProvider } from '../contexts/countDownContext';
import { GetServerSideProps } from 'next'
import { ChallengesProvider } from '../contexts/challengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}>

      <div className={style.container}>
        <Head>
          <title>Inicio | movit</title>
        </Head>

        <ExperienceBar />
        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
