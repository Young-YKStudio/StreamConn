import Profile from './profile'
import Security from "./security"
import Channel from './channel'

const SettingsLanding = ({settingsMenu}) => {
  if (settingsMenu == 'profile') {
    return <Profile />
  } else if (settingsMenu == 'security') {
    return <Security />
  } else if (settingsMenu == 'channel') {
    return <Channel />
  }
}
export default SettingsLanding