// 'use client'

const SettingsMenu = () => {
  return (
    <div>
      <div className='flex flex-row justify-center gap-4'>
        <a href="/settings/profile" className="border rounded hover:bg-red-300">Profile</a>
        <a href="/settings/security" className="border rounded hover:bg-red-300">Security</a>
        <a href="/settings/channel" className="border rounded hover:bg-red-300">Channel</a>
      </div>
    </div>
  );
}
export default SettingsMenu;