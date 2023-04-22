import React, { useState } from "react";
import Link from "next/link";
import {Shiba} from "../../../utils/addresses";
import {Arbitrum} from "../../../utils/addresses";
import {EthClasic} from "../../../utils/addresses";
import back from "../../../images/goback.png";
import Image from "next/image";
import styles2 from "../../../styles/launchpad.module.css"
import styles from "../../../styles/p2p.module.css"
import AdForm from "./adForm";





const CreateAdds = () => {
const [showDetails, setShowDetails] = useState(true);
const EthClas = EthClasic();
const Arb = Arbitrum();
const Shib = Shiba();
const [addToken, setAddToken] = useState(EthClas ? EthClas : "0x0000");

function handleSetToken(address) {
  setAddToken(address);
}

function handleShowDetails(value) {
  setShowDetails(value);
  console.log(`firstcheck ${value}`);
}


  const checkBuy = showDetails ? styles.SelectedBuy : "";
  const checkShow = showDetails ? "" : styles.SelectedSell;
  const ethSelected = addToken == EthClas ? styles.tokensSelected : "";
  const shibSelected = addToken == Shib ? styles.tokensSelected : "";
  const arbSelected = addToken == Arb ? styles.tokensSelected : "";

return (
  <div className={`py-4 pl-8 ${styles.launchpad}`}>

    <div className={`${styles.card2} `}>
      <div className={`flex flex-row justify-between`}>
      <h1 className="text-5xl pb-3"> CREATE P2P AD.</h1>
        <div className={`${styles2.topBar} flex flex-row `}>
            <Link href="/p2p/">
          <div className={`flex flex-row w-[14rem] h-[3.1rem] px-[rem] justify-center ml-auto gap-0 ${styles2.createBtn}`}>
            <div className="m-0 w-12 h-12">
              <Image src={back} />
            </div>
            <button className={`h-[3rem] w-[12rem] font-pop text-sm`}> GO BACK </button>
          </div>
            </Link>
        </div>      
      </div>
      <div className={` flex-row flex justify-between mb-[4rem] ${styles.header}`} >

        
      <div className="flex gap-10  mt-6 font-pop text-base">
        <button className={`text-lg ${styles.tokens} ${ethSelected}`}  onClick={() => handleSetToken(EthClas)}>
          EthClassic
        </button>
        <button className={`text-lg  ${styles.tokens} ${shibSelected}`} onClick={() => handleSetToken(Shib)}>
          Shiba
        </button>
        <button className={`text-lg ${styles.tokens} ${arbSelected}`}  onClick={() => handleSetToken(Arb)}>
          Arbitrum
        </button>
      </div>

      <div className={`flex mb-6 font-pop text-lg ${styles.options}`}>
        <button className={`text-lg ${checkBuy} ${styles.Options1}`} onClick={() => handleShowDetails(true)}>
          Buy
        </button>
    <button className={`text-lg pl-10 ${checkShow} ${styles.Options1}`} onClick={() => handleShowDetails(false)}>
      Sell
    </button>

      </div>
    </div>
    <div>
        {/* <AllAdds contractAddress={addToken} anotherProp={showDetails} /> */}
        <AdForm contractAddress={addToken} anotherProp={showDetails}/>
    </div>

    </div>
  </div>
);}

export default CreateAdds;
