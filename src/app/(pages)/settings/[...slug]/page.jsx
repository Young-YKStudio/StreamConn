import SettingsMenu from './(components)/settingsMenu'
import SettingsLanding from './(components)/settingsLanding';

const Settings = async ({params}) => {
  const selectedMenu = params.slug

  return (
    <div className='flex flex-col flex-nowrap pt-20 px-4'>
      <SettingsMenu settingsMenu={selectedMenu} />
      <SettingsLanding settingsMenu={selectedMenu} />
    </div>
  );
}
export default Settings;