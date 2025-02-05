import React from 'react'
import Header from '../Components/Header'
import Steps from '../Components/Steps'
import Description from '../Components/Description'
import Testimonial from '../Components/Testimonial'
import GenerateBtn from '../Components/Generate-btn'

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimonial/>
        <GenerateBtn/>
    </div>
  )
}

export default Home