'use client'

import { useState } from 'react'
import { Switch } from '@headlessui/react'

const SettingsProfile = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group>
      <div className='flex flex-col gap-1'>
        <div className='pb-1'>
          <p className='text-xs font-bold'>Display Name</p>
          <p className='text-slate-300 text-xs'>Special charactors and spaces are not allowed, 2-16 letters</p>
        </div>

        <div className='flex flex-row justify-between items-center gap-1'>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-blue-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

        {/* <input 
          type='text' 
          value={nickName}
          onChange={nickNameChangeHandler} 
          placeholder='Enter channel name'
          // className={`bg-black/30 ring-0 border-none rounded-md focus:ring-0 text-sm px-4 py-2 ${errorMessage !== '' && 'ring-2 ring-red-500'}`}
        /> */}
      </div>
    </Switch.Group>
  )

//   return (
//     <div>
//       <div className="border border-solid border-white rounded-md">Profile settings
//         <p>Profile Picture</p>
//         <p>Nickname</p>
//         <p>Bio/Intro</p>
//       </div>
//     </div>
//   );
}
export default SettingsProfile;