import axios from 'axios';
import SettingsLanding from './(components)/settingsLanding';

const Settings = async ({params}) => {
  const selectedMenu = params.slug

  return (
    <div className='flex flex-col flex-nowrap pt-20 px-4'>
      <div className='flex flex-row justify-center gap-4'>
        <a href="/settings/profile" className="border rounded hover:bg-red-300">Profile</a>
        <a href="/settings/security" className="border rounded hover:bg-red-300">Security</a>
        <a href="/settings/channel" className="border rounded hover:bg-red-300">Channel</a>
      </div>
      <SettingsLanding settingsMenu={selectedMenu} />
    </div>
  );
}

export default Settings;
