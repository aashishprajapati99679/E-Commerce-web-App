import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BextSeller from '../components/BextSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BextSeller />
      <OurPolicy />
      <NewLetterBox />
    </div>
  )
}

export default Home