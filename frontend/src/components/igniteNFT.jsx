import  styles2  from "../styles/aboutUs.module.css"


export default function IgniteNFT() { 
 return (
        <div className={`  ${styles2.aboutUs} mt-[1rem] mb-[6rem]`}>
        <div className={`flex justify-center items-center flex-row gap-11 pt-[6rem] px-[4rem]`}>
             <div className={` ${styles2.glassCard4} p-[6rem] `}>
                <p className="text-4xl font-headers mb-6 text-indigo-600">NFT (Non Fungible Tokens)</p>
                <h1 className=" text-4xl mb-5 font-pop"> Our NFT Rewards</h1>

                <p className="text-xl font-pop leading-10 ">
                Discover our captivating selection of NFT rewards, which offer exceptional digital assets as incentives for our loyal customers. These distinctive NFTs unlock access to a variety of exclusive services, providing our valued clientele with unparalleled benefits and experiences.
                </p>
            </div>

            <div className={` ${styles2.NftImage} p-[6rem] `}>

            </div>
        </div>
        </div>        
  )
}