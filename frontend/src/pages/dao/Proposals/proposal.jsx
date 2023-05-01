import React, { useState, useEffect } from "react";
import styles from "../../../styles/Dao.module.css"
import Link from "next/link";

export default function Proposal() {
    return (
    <Link href={`./Proposals/`}>
    <div className={`${styles.proposal} flex flex-row w-[100%] justify-between cursor-pointer`}>
      <div className="flex flex-col gap-2">
        <div><p>Proposal</p></div>
        <div className="flex"><p className="mr-auto ml-auto">#1</p></div>
      </div>

      <div className="flex flex-col gap-2">
        <div><p>ID: 267565.....97863832</p></div>
        <div><p>Cartegory: Milestone Payment Request</p></div>
      </div>     
      
      <div className=" flex ">
        <div className="mt-auto mb-auto"><p>Active</p></div>
      </div> 
    </div>
    </Link>            
  );
}