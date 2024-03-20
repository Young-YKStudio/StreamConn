'use client'
import { useSession } from 'next-auth/react'
import LandingSideBarLogged from '@/app/components/sidebar/landingSideBar/landingSideBarLogged'
import LandingSideBarPublic from '@/app/components/sidebar/landingSideBar/landingSideBarPublic'

const SidebarRenderContainer = ({streamers}) => {

  const session = useSession()

  return (
    <>
      { session.status === 'authenticated' ? <LandingSideBarLogged streamers={streamers} session={session}/> : <LandingSideBarPublic streamers={streamers} /> }
    </>
  );
}
export default SidebarRenderContainer;