import { useEffect, useState } from 'react'
import { getAllTeamsByOwner, getAllTeamModerators, addNewTeam, addTeamModerator, removeTeamModerator } from '@/redux/service/teamService'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const SettingsTeam = ({ currentLoggedUser }) => {
  const [ inputTeamName, setInputTeamName ] = useState('')
  const [ inputTeamModerator, setInputTeamModerator ] = useState('')
  const [ teams, setTeams ] = useState([])
  const [ teamModerators, setTeamModerators ] = useState([])

  const router = useRouter()

  // useEffect(() => {
  //   if (currentLoggedUser) {
  //     const teamGetAllMods = async () => {
  //       let userData = { 
  //         id: currentLoggedUser._id,
  //       } 
 
  //       const response = await teamGetAllModerators(userData)
  //       if (response.status === 200) {
  //         setTeamModerators(response.data.moderators)
  //       }
  //     }

  //     teamGetAllMods()
  //   }
  // }, [currentLoggedUser])

  useEffect(() => {
    if (currentLoggedUser) {
      const getAllTeams = async () => {
        let teamOwnerData = { 
          teamOwner: currentLoggedUser._id,
        } 
        const response = await getAllTeamsByOwner(teamOwnerData)
        if (response.status === 200) {
          setTeams(response.data)
        }
      }
      getAllTeams()
    }
  }, [currentLoggedUser])

  const addNewTeamHandler = async (text) => {
    let teamData = {
      teamName: text,
      teamOwner: currentLoggedUser._id,
      teamOwnerNickname: currentLoggedUser.nickname,
    }

    try {
      const response = await addNewTeam(teamData)
      if (response.status === 200) {
        setTeams(response.data)
        return router.refresh()
      } 
    } catch (error) {
      console.log(error, 'at api addNewTeam call')
    }
  }

  const addTeamModeratorHandler = async (text) => {
    if (currentLoggedUser.nickname == text) {
      //already Owner, so just return
      toast.error('Owner cannot be added')
      return
    }

    let foundMod = teamModerators.find((mod) => mod.nickname == text)
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
      const response = await addTeamModerator(userData)
      if (response.status === 200) {
        setTeamModerators(response.data.moderators)
        return router.refresh()
      }
    } catch (error) {
      console.log(error, 'at api addPost call')
    }
  }

  const removeTeamModeratorHandler = async (moderatorId) => {
    let userData = { 
      channelOwnerId: currentLoggedUser._id,
      moderatorId: moderatorId,
    } 

    try {
      const response = await removeTeamModerator(userData)
        if (response.status === 200) {
        setTeamModerators(response.data.moderators)
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
        <p>Add a new team:</p>
          <input type='text' value={inputTeamName} onChange={(e) => setInputTeamName(e.target.value)} className='bg-transparent focus:ring-0 focus:outline-none text-xs'/>
          <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => addNewTeamHandler(inputTeamName) }>Add new team</button>
        </div>
        <div className='flex gap-3'>
        <p>Add a new team moderator:</p>
          <input type='text' value={inputTeamModerator} onChange={(e) => setInputTeamModerator(e.target.value)} className='bg-transparent focus:ring-0 focus:outline-none text-xs'/>
          <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => addTeamModeratorHandler(inputTeamModerator) }>Add new moderator</button>
        </div>
      </div>
      <div className='border border-solid border-red-500 rounded-md'>
        {<div>
          Teams:
          { teams && teams.map((team) => { 
            return (
              <div key={team._id} className='flex gap-3 border border-solid border-yellow-500 rounded-md'>
                { team.teamName }
                {/* <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => removeTeamModeratorHandler(mod._id) }>Remove this moderator</button> */}
              </div>
            )
          })}
        </div>}

        {/* {<div>
          Team moderators:
          { teamModerators && teamModerators.map((mod) => { 
            return (
              <div key={mod._id} className='flex gap-3'>
                { mod.nickname }
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => removeTeamModeratorHandler(mod._id) }>Remove this moderator</button>
              </div>
            )
          })}
        </div>} */}
      </div>
    </div>
  );
}
export default SettingsTeam;