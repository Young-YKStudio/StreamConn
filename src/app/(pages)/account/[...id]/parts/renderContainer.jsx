'use client'
import ProfileIndividual from "./profile";
import SectionTabs from "./tabs";
import HomeSection from "../(sections)/home/homeSection";
import ChannelsSection from "../(sections)/channels/channelsSection";
import { useState } from 'react'

const IndividualRenderContainer = ({user, returnedPosts}) => {
  
  const [ currentSection, setCurrentSection ] = useState('home')

  const sectionDistributor = (section) => {
    if(section === 'home') {
      return <HomeSection />
    }
    if(section === 'channels') {
      return <ChannelsSection returnedPosts={returnedPosts} />
    }
  }

  return (
    <div className="pt-20 px-4 text-white">
      <ProfileIndividual user={user}/>
      <SectionTabs currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <div>
        {sectionDistributor(currentSection)}
      </div>
    </div>
  );
}
export default IndividualRenderContainer;