import  styles2  from "../styles/aboutUs.module.css"


export default function LaunchYourToken() { 
 return (
        <div className={`  ${styles2.aboutUs} mt-[-4rem]`}>
        <div className={`flex flex-row flex justify-center items-center pt-[6rem]`}>
             <div className={` ${styles2.glassCard5}  flex flex-row p-[4.5rem] pl-2`}>
                <div className="w-[45%]">
                    <div className={styles2.docsImg}></div>
                </div>
            <div>

                <p className="font-headers uppercase text-xl mb-5 text-indigo-600">Launches</p>
                <h1 className="text-4xl font-EudoxusSansBold mb-5"> Launch Your Token</h1>

               <div className={`flex flex-row  space-x-4 mb-5 ${styles2.shift}`}>
               <div className={`${styles2.bullet} font-headers text-2xl`}>
                    <p> 01 </p>
                </div>
                   <div className="w-[30rem] font-pop text-xl">
                    <p>Place a request to create a LaunchPad by filling 
                        the request Launchpad form on out platform.</p>
                </div>
               </div>
               <div className={`flex flex-row  space-x-4 mb-5 ${styles2.shift}`}>
               <div className={`${styles2.bullet} font-headers text-2xl`}>
                    <p> 02 </p>
                </div>
                  <div className="w-[30rem] font-pop text-xl">
                    <p>Back and forth communications, verifications and identification between our team and yours. </p>
                </div>
               </div>

                <div className={`flex flex-row  space-x-4 mb-5 ${styles2.shift}`}>
                <div className={`${styles2.bullet} font-headers text-2xl`}>
                    <p> 03 </p>
                </div>
                  <div className="w-[30rem] font-pop text-xl">
                    <p> Unique Id is Generated and issued to you, which is to be used in creating your Launchpad on the instructed Date. </p>
                </div>
               </div>
               <div className={`flex flex-row  space-x-4 mb-5 ${styles2.shift}`}>
                <div className={`${styles2.bullet} font-headers text-2xl`}>
                    <p> 04 </p>
                </div>
                  <div className="w-[30rem] font-pop text-xl">
                    <p>Users participate in your Launchpad and get your tokens in return. </p>
                </div>
               </div>
            </div>
                </div>

        </div>
        </div>        
  )
}