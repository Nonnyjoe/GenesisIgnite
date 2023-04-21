import styles from "../../styles/index.module.css";
import styles2 from "../../styles/aboutUs.module.css";
import styles3 from "../../styles/reusables.module.css";
import PageLayout from "../../layout/PageLayout";
import Image from "next/image";
import ignitelogo from "../../images/web2.png";
import nonso from "../../images/Nonso.jpg";
import Link from "next/link";

export default function Documentation() {

  return (
    <div className={` mt-[21rem] ${styles2.aboutUs}`}>
      <div className={styles.innerDiv}></div>
      <div className={`${styles2.padding} ${styles.glassCard3} px-9 py-5`}>
        <nav className={`${styles.navi} flex flex-row  p-5`}>
          <div className={`${styles.Image}`}>
            <Image src={ignitelogo} alt="iginite logo" />
          </div>
          <div
            className={`${styles.navDiv} font-headers text-xl w-[50%] flex flex-row`}
          >
            <div className={`${styles3.navLink}`}>
              {" "}
              <Link href="../"> Home</Link>
            </div>
            <div className={`${styles3.navLink}`}>
              <Link href="/documentation">Documentation</Link>{" "}
            </div>
            <div>
              <Link href="/dashboard">
                <button
                  class={`${styles3.btnHover} ${styles3.color7} text-2xl`}
                >
                  Launch App
                </button>
              </Link>
            </div>
          </div>
        </nav>
        <div className="mt-[4rem] flex align-middle justify-center text-center">
          <h1 className="text-4xl text-white font-EudoxusSansBold">
            {" "}
            DOCUMENTATION{" "}
          </h1>

        </div>

        <div className={`${styles2.marginTop} text-center`}>
            <h2 className="text-2xl font-EudoxusSansBold text-white mt-6 mb-6">
              About us
            </h2>
            <p className="text-white text-lg mb-6 max-8xl mx-auto text-left">
              The Genesis Ignite DApp is a decentralized platform that offers a
              gamified experience for users, creating a friendly environment
              where each page is an exciting and interactive experience. Our aim
              is to revolutionize the way startups and small businesses raise
              capital by leveraging the power of blockchain technology and
              decentralized finance. The platform provides an efficient,
              secure, and transparent way for projects to raise funds through
              token offerings and presales. The DApp is designed to be
              user-friendly, with an intuitive interface that simplifies the
              fundraising process for both project creators and investors. With
              its robust features and cutting-edge technology, the Genesis
              Ignite DApp has the potential to disrupt the traditional
              fundraising industry and create new opportunities for businesses
              of all sizes.
            </p>
            <h2 className="text-2xl font-EudoxusSansBold text-white mt-6 mb-6">
              The Core Team
            </h2>
            <p>
            Meet the Genesis Ignite Core Team, a group of talented individuals with diverse 	backgrounds and expertise. Our team includes Founders, Smart Contract developers, Market Analyst, Marketers, and Key Opinion Leaders from top 100 crypto projects, enabling us to 	create network effects for projects joining our incubator with ease.
            </p>

            <h6 className="text-2xl font-EudoxusSansBold text-white mt-6 mb-6">
            Genesis Ignite is a leading crypto company Based in Nigeria. 

            </h6>
    <div className="flex flex-wrap max-w-sm mx-auto justify-center gap-4">
        <div>
        <Image src={nonso} width={100} height={100} className="rounded-full"/>
        <h6>pter</h6>
        <p>pter</p>
        <a href="#">git</a>
        <a href="#">git</a>
        </div>

        <div>
        <Image src={nonso} width={100} height={100} className="rounded-full"/>
        <h6>pter</h6>
        <p>pter</p>
        <a href="#">git</a>
        <a href="#">git</a>
        </div>

        <div>
        <Image src={nonso} width={100} height={100} className="rounded-full"/>
        <h6>pter</h6>
        <p>pter</p>
        <a href="#">git</a>
        <a href="#">git</a>
        </div>

        <div>
        <Image src={nonso} width={100} height={100} className="rounded-full"/>
        <h6>pter</h6>
        <p>pter</p>
        <a href="#">git</a>
        <a href="#">git</a>
        </div>

        <div>
        <Image src={nonso} width={100} height={100} className="rounded-full"/>
        <h6>pter</h6>
        <p>pter</p>
        <a href="#">git</a>
        <a href="#">git</a>
        </div>
            </div>
          </div>
        </div>
      </div>

  );
}