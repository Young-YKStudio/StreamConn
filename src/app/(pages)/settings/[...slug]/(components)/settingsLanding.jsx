'use client'

import SettingsProfile from './settingsProfile'
import SettingsSecurity from './settingsSecurity'
import SettingsChannel from './settingsChannel'
import { useSelector } from 'react-redux'

const SettingsLanding = ({ settingsMenu }) => {
  const currentLoggedUser = useSelector(state => state.redux.auth)

  if (settingsMenu == 'profile') {
    return <SettingsProfile />
  } else if (settingsMenu == 'security') {
    return <SettingsSecurity />
  } else if (settingsMenu == 'channel') {
    return <SettingsChannel currentLoggedUser={ currentLoggedUser } />
  }
}
export default SettingsLanding