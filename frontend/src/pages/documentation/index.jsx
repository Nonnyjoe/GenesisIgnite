import styles from "../../styles/index.module.css";
import styles2 from "../../styles/aboutUs.module.css";
import styles3 from "../../styles/reusables.module.css";
import PageLayout from "../../layout/PageLayout";
import Image from "next/image";
import ignitelogo from "../../images/web2.png";
import nonso from "../../images/Nonso.jpg";
import scar from "../../images/scar.jpg";
import chris from "../../images/chris.jpeg";
import uche from "../../images/uche.jpeg";
import williams from "../../images/williams.jpeg";
import bunz from "../../images/bunzz.jpg";
import bunzz from "../../images/bunzz.png";
import chain from "../../images/chainide.png";
import jay from "../../images/comingsoon.png";
import scarface from "../../images/comingsoon1.png";
import web3afrika from "../../images/web3afrika.png";
import web3bridge from "../../images/web3bridge.jpg";
import doc from "../../images/doc.png";

import Link from "next/link";

export default function Documentation() {
  return (
    <div className={` mt-20 ${styles2.aboutUs}`}>
      <div className={styles.innerDiv}></div>
      <div
        className={`${styles2.padding} ${styles.glassCard4} mx-auto px-24 py-24`}
      >
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
            gamified experience for users, creating a friendly environment where
            each page is an exciting and interactive experience. Our aim is to
            revolutionize the way startups and small businesses raise capital by
            leveraging the power of blockchain technology and decentralized
            finance. The platform provides an efficient, secure, and transparent
            way for projects to raise funds through token offerings and
            presales. The DApp is designed to be user-friendly, with an
            intuitive interface that simplifies the fundraising process for both
            project creators and investors. With its robust features and
            cutting-edge technology, the Genesis Ignite DApp has the potential
            to disrupt the traditional fundraising industry and create new
            opportunities for businesses of all sizes.
          </p>
          <h2 className="text-2xl font-EudoxusSansBold text-white mt-6 mb-6">
            The Core Team
          </h2>
          <p>
            Meet the Genesis Ignite Core Team, a group of talented individuals
            with diverse backgrounds and expertise. Our team includes Founders,
            Smart Contract developers, Market Analyst, Marketers, and Key
            Opinion Leaders from top 100 crypto projects, enabling us to create
            network effects for projects joining our incubator with ease.
          </p>

          <h6 className="text-2xl font-EudoxusSansBold text-white mt-6 mb-6">
            Genesis Ignite is a leading crypto company Based in Nigeria.
          </h6>
          <div className="flex flex-wrap max-w-6xl mx-auto justify-center gap-4">
            <div>
              <Image
                src={nonso}
                width={150}
                height={150}
                className="rounded-full"
              />
              <h6>Idogwu Chinonso</h6>
              <p>Smart Contract and Front-End developer</p>
              <Link href="https://github.com/Nonnyjoe" target="_blank">🐙 : GitHub </Link>
              <Link href="https://twitter.com/ChinonsoIdogwu" target="_blank">🐦 : Twitter </Link>
            </div>

            <div>
              <Image
                src={scar}
                width={150}
                height={150}
                className="rounded-full"
              />
              <h6>Scar Face dot ETH</h6>
              <p>Blockchain Engineer and Market Analyst</p>
              <Link href="https://github.com/scarfacedotcom" target="_blank">🐙 : GitHub </Link>
              <Link href="https://twitter.com/scarfacedotsol" target="_blank">🐦 : Twitter </Link>

            </div>

            <div>
              <Image
                src={williams}
                width={150}
                height={150}
                className="rounded-full"
              />
              <h6>William Adepoju</h6>
              <p>Smart Contract and Front-End developer</p>
              <Link href="https://github.com/Bill-Adepoju" target="_blank">🐙 : GitHub </Link>
              <Link href="https://twitter.com/flippantVibe" target="_blank">🐦 : Twitter </Link>
            </div>

            <div>
              <Image
                src={uche}
                width={150}
                height={150}
                className="rounded-full"
              />
              <h6>Uchene Okolo</h6>
              <p>Smart Contract developer</p>
              <Link href="https://github.com/Ucheokolo" target="_blank">🐙 : GitHub </Link>
              <Link href="https://twitter.com/uche2v" target="_blank">🐦 : Twitter </Link>
            </div>

            <div>
              <Image
                src={chris}
                width={150}
                height={150}
                className="rounded-full"
              />
              <h6>Mr. Chris</h6>
              <p>Smart Contract developer</p>
              <Link href="https://github.com/Enenche23" target="_blank">🐙 : GitHub </Link>
              <Link href="https://twitter.com/ejeh_elias" target="_blank">🐦 : Twitter </Link>
            </div>
          </div>

          <p className="text-1xl font-EudoxusSansBold text-white mt-6 mb-6">
            With a wealth of experience and a shared passion for the blockchain
            industry, we work collaboratively to develop innovative solutions
            and drive the growth of the crypto space.
          </p>

          <h2 className="text-2xl font-EudoxusSansBold text-white mt-10 mb-10">
            Partners
          </h2>
          <div className="flex flex-wrap max-w-6xl mx-auto justify-center gap-8">
            <div>
              <Image
                src={bunz}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>

            <div>
              <Image
                src={bunzz}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>

            <div>
              <Image
                src={chain}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>

            <div>
              <Image
                src={web3afrika}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>

            <div>
              <Image
                src={web3bridge}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl text-center font-EudoxusSansBold text-white mt-10 mb-10">
          Investors
        </h2>
        <div className="flex flex-wrap max-w-6xl mx-auto justify-center gap-8">
          <div>
            <Image
              src={scarface}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          <div>
            <Image
              src={jay}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>

        <h2 className="text-2xl text-center font-EudoxusSansBold text-white mt-10 mb-10">
          Want to know more about Genesis Ignite 🔥🔥🔥🔥...
        </h2>
        <div className="flex flex-wrap max-w-6xl mx-auto justify-center gap-8">
          <div className="flex flex-col items-center">
            <Image src={doc} width={150} height={200} />
            <a
              href="https://drive.google.com/drive/folders/1qM_SuBrOxzmrRoZd2LuAPmKsiraRC4CW?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
            >
              <span>Read Full Documentation Here...</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2.5 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M13.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
