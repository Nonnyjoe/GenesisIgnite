import  styles2  from "../styles/aboutUs.module.css"


export default function WhatsNew() {

  return (
        <div className={`  ${styles2.aboutUs} mt-[-4rem]`}>
        <div className={`p-[6rem] px-[4rem] flex flex-row gap-11 `}>

             <div className={` ${styles2.glassCard4} p-[4rem] pt-[4rem] `}>
                <p className="font-headers uppercase text-xl mb-5 text-indigo-600"> What's Different</p>
                <h1 className="font-EudoxusSansBold text-4xl mb-9"> What's Different About Genesis Ignite</h1>
                 <div className="flex flex-row  space-x-12 mb-4">
                    <div className="">
                        <div className={`${styles2.WDcover}`}>
                        <div className={`${styles2.automate}`}></div>
                        </div>
                        <div className="">
                            <h2 className="font-headers uppercase text-xl mt-4 mb-4 text-indigo-600">More Automated</h2>
                            <p className="font-pop text-xl">We have the latest update enabling Automated 
                                transition from Launchpad to presale plus an upgrade of
                                automated price determination.
                            </p>
                        </div>
                    </div>
                     <div>
                        <div className={`${styles2.WDcover}`}>
                            <div className={`${styles2.secure}`}></div>
                        </div>
                        <div>
                            <h2 className="font-headers uppercase text-xl mt-4 mb-4 ">More Secure</h2>
                            <p className="font-pop text-xl">Our contracts are designed with the security of both 
                                the launchpad creator and participants in Mind.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={` ${styles2.globe} p-[6rem] `}>
                <div className={styles2.globeFoot}>

                </div>
            </div>
        </div>
        </div>        
  )

}