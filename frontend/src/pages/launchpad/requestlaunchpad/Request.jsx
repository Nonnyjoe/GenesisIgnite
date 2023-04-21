import { React, useState, useReducer } from "react";
import Header from "../../../components/header";
import styles from "../../../styles/requestlaunchpad.module.css";
import reusable from "../../../styles/reusable.module.css";
import { create, Web3Storage } from 'web3.storage'
import Image from "next/image";
import click from "../../../images/click.png"
import Link from "next/link";

const token = process.env.API_TOKEN

export default function RequestLaunchPad() {
  const [messages, showMessage] = useReducer((msgs, m) => msgs.concat(m), [])
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGIyMjlDQjE4MTU3QUU2NTBhMEIzMkNhNjZFNzczYzNFQjYzOUI2QzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODE1NjM0NTI0ODAsIm5hbWUiOiJHZW5lc2lzSWduaXRlIn0.5dVJUn5YTwFuEZC10Mv4PD7IpWdNIHj0hgu3EkSGEjA')
  const [files, setFiles] = useState([])
  const [imageCID, setimageCID] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    projectName: "",
    email: "",
    tokenAddress: "",
    agreement: false,
    projectWebsite: "",
    projectTwitter: "",
    // imageCID: ""
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }


/// HANDLES SENDING TO IPFS AND DISPLAYING TRANSACTION STATUS
async function handleSubmit(event) {
    // don't reload the page!
    event.preventDefault()

    showMessage('> 📦 creating web3.storage client')
    const client = new Web3Storage({ token })

    showMessage('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')

    // Filter the uploaded files to only accept .png files
    const filteredFiles = Array.from(files).filter(file => file.type === 'image/png')

    // Rename the filtered files to "companyFile"
    const renamedFiles = filteredFiles.map(file => {
      const renamedFile = new File([file], 'tokenLogo', { type: 'image/png' })
      return renamedFile
    })

    const cid = await client.put(renamedFiles, {
      onRootCidReady: localCid => {
        showMessage(`> 🔑 locally calculated Content ID: ${localCid} `)
        showMessage('> 📡 sending files to web3.storage ')
      },
      onStoredChunk: bytes => showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
    })
    // setimageCID({cid}.cid);
    showMessage(`> ✅ web3.storage now hosting ${cid}`)
    showLink(`https://${cid}.ipfs.w3s.link/tokenLogo`)

    // update the useState for the item details 
     setFormData(prevFormData => ({...prevFormData, imageCID: {cid}.cid}))
    console.log(formData);

    showMessage('> 📡 fetching the list of all unique uploads on this account')
  }

  function showLink(url) {
    showMessage(<span>&gt; 🔗 <a href={url}>{url}</a></span>)
  }


  //////// ---------- function to convert the form input to a json file ------------- ////////



  return (
      <div className={`${styles.body}`}>

          <Link href={`./createLaunchPad`}>
        <div className={`${styles.changeForm} text-sm font-pop flex flex-row gap-4`}>
          <div className="h-[2.2rem] w-[2.2rem] rotate-[50deg]">
            <Image src={click} />
          </div>
          <div>
          <h1> CREATE LAUNCHPAD </h1>
          </div>
        </div>
        </Link>
        <div className={styles.formdetails}>
          <h1 className={`font-EudoxusSansBold text-4xl mb-10`}>REQUEST LAUNCHPAD </h1>
          <form onSubmit={handleSubmit} id="contact-field" className={`requestForm`} enctype="multipart/form-data">
            <div className={styles.names}>
            <div className={`flex flex-row text-base font-pop gap-9`}>
              <div>
                <label htmlFor="Name" className={styles.labels}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                  className={styles.ownerName}
                />
              </div>

              <div>
                <label htmlFor="projectName" className={styles.labels}>
                  Project name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Project Name"
                  onChange={handleChange}
                  name="projectName"
                  value={formData.projectName}
                  className={styles.projectName}
                />
              </div>
              </div>
            </div>
            <div className={`flex flex-row text-base font-pop gap-9`}>
            <div>
            <label htmlFor="email" className={styles.labels}>
              Email
            </label>
            <input
              type="email"
              placeholder="yourname@email.com"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className={styles.emailInput}
            />
            </div>
              <div>
            <label htmlFor="tokenAddress" className={styles.labels}>
              Token Address
            </label>
            <input
              type="text"
              value={formData.tokenAddress}
              placeholder="Verified address of the token you plan to launch"
              onChange={handleChange}
              name="tokenAddress"
              className={styles.tokenAddress}
            />
            </div>
            </div>

            <div className={`flex flex-row text-base font-pop gap-9`}>
            <div>
            <label htmlFor="projectWebsite" className={styles.labels}>
              Project Website
            </label>
            <input
              type="text"
              value={formData.projectWebsite}
              placeholder="project website "
              onChange={handleChange}
              name="projectWebsite"
              className={styles.projectWebsite}
            />
            </div>
            <div>
            <label htmlFor="projectTwitter" className={styles.labels}>
              Project Twitter handle
            </label>
            <input
              type="text"
              value={formData.projectTwitter}
              placeholder="Project Twitter Handle"
              onChange={handleChange}
              name="projectTwitter"
              className={styles.projectTwitterHandle}
            />
            </div>
            </div>

            <div className={`mb-5 mt-2 font-pop text-base`}>
             <label className="" htmlFor='filepicker'>Upload Token Logo (only .png files are allowed)</label>
             <br/>
            <input type='file' id='filepicker' name='fileList' accept='.png' onChange={e => setFiles(e.target.files)} multiple required />
            </div>
            <div className="mb-5 gap-3 font-pop text-base">
            <input
              type="checkbox"
              id="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              name="agreement"
            />
            <label className="agree-label" htmlFor="agreement">
              You agree to providing your data to Genesis Ignite who may contact
              you.
            </label>
            </div>

            <button className={` font-pop mt-4 ${styles.btnSubmit}`}>Request Lauchpad</button>
          </form>

        <div id='output1' className={styles.ipfsResult}>
        &gt; ⁂ waiting for form submission...
        {messages.map((m, i) =>
         <div key={m + i}>{m}</div>)}
      </div>
        </div>
      </div>
  );
}