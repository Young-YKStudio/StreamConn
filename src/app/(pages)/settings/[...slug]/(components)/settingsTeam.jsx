import { useEffect, useState } from 'react'
import { getAllModerators, addModerator, removeModerator } from '@/redux/service/settingsService'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const SettingsTeam = ({ currentLoggedUser }) => {
  const [ inputText, setInputText ] = useState('')
  const [ moderators, setModerators ] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (currentLoggedUser) {
      const getAllMods = async () => {
        let userData = { 
          id: currentLoggedUser._id,
        } 
 
        const response = await getAllModerators(userData)
        if (response.status === 200) {
          setModerators(response.data.moderators)
        }
      }

      getAllMods()
    }
  }, [currentLoggedUser])

  const addHandler = async (text) => {
    if (currentLoggedUser.nickname == text) {
      //already Owner, so just return
      toast.error('Owner cannot be added')
      return
    }

    let foundMod = moderators.find((mod) => mod.nickname == text)
    if (foundMod) {
      //already Moderator, so just return
      toast.error('Already exists')
      return
    }

    let userData = { 
      channelOwnerId: currentLoggedUser._id,
      moderatorNickname: text,
    } 

    try {
      const response = await addModerator(userData)
      if (response.status === 200) {
        setModerators(response.data.moderators)
        return router.refresh()
      }
    } catch (error) {
      console.log(error, 'at api addPost call')
    }
  }

  const removeHandler = async (moderatorId) => {
    let userData = { 
      channelOwnerId: currentLoggedUser._id,
      moderatorId: moderatorId,
    } 

    try {
      const response = await removeModerator(userData)
        if (response.status === 200) {
        setModerators(response.data.moderators)
        return router.refresh()
      }
    } catch (error) {
      console.log(error, 'at api addPost call')
    }
  }

  return (
    <div>
      <div className="border border-solid border-white rounded-md">
        <p>Team settings</p>
        <div className='flex gap-3'>
        <p>Add a new team moderator:</p>
          <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} className='bg-transparent focus:ring-0 focus:outline-none text-xs'/>
          <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => addHandler(inputText) }>Add</button>
        </div>
      </div>
      <div>
        {<div>
          My team moderators:
          { moderators && moderators.map((mod) => { 
            return (
              <div key={mod._id} className='flex gap-3'>
                { mod.nickname }
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => removeHandler(mod._id) }>Remove</button>
              </div>
            )
          })}
        </div>}
      </div>
    </div>
  );
}
export default SettingsTeam;