'use client'
import ProfileIndividual from "./profile";
import SectionTabs from "./tabs";
import HomeSection from "../(sections)/home/homeSection";
import ChannelsSection from "../(sections)/channels/channelsSection";
import { useState } from 'react'

const IndividualRenderContainer = ({user}) => {

  const [ currentSection, setCurrentSection ] = useState('Home')

  const sectionDistributor = (section) => {
    if(section === 'Home') {
      return <HomeSection />
    }
    if(section.startsWith('Channel')) {
      return <ChannelsSection />
    }
  }

  return (
    <div className="pt-20 px-4 text-white w-full flex flex-col items-center">
      <ProfileIndividual user={user}/>
      <SectionTabs currentSection={currentSection} setCurrentSection={setCurrentSection} user={user} />
      <div>
        {sectionDistributor(currentSection)}
      </div>
    </div>
  );
}
export default IndividualRenderContainer;