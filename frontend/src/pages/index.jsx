import Head from 'next/head';
import AboutUs from "../components/aboutUs"
import FooterSec from '../components/FooterSec';
import Hero from "../components/Hero"
import HowWeWork from '../components/howWeWork';
import IgniteNFT from '../components/igniteNFT';
import LaunchYourToken from '../components/LaunchYourToken';
import Sponsors from '../components/sponsors';
import WhatsNew from '../components/whatsNew';


const Home  = () => {
  return (
    <div>
      <Head>
        <title>Ignite App</title>
        <meta
          content="Ignite Crypto Launchpad"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

        <main className= "">
        <Hero/>
        <AboutUs/>
        <HowWeWork/>
        <Sponsors/>
        <WhatsNew/>
        <LaunchYourToken/>
        <IgniteNFT/>
        <FooterSec/>
      </main>
      </div>
  )
}
export default Home;
