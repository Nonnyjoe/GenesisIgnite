import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


const PageLayout = ({children} : any) => {
  return (
    <div>
        <Navbar />
            {children}
        <Footer />  
    </div>
    
  )
}

export default PageLayout