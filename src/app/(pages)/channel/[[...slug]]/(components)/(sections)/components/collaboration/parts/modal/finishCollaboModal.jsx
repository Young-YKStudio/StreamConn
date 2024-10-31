import { Dialog, Transition, Switch } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Fragment, useState, useEffect } from 'react';
import { MdClose, MdLock } from 'react-icons/md'
import { searchGame } from '@/redux/service/IGDBServices'
import { MdOutlineCircle, MdOutlineCheckCircleOutline } from "react-icons/md";
import { searchCollarboUser, invitationSetUp } from '@/redux/service/collarborationService'

const FinishCollaboModal = ({event, finishSetupModal, setFinishSetupModal, loggedUser}) => {

  const [ searchGameInput, setSearchGameInput ] = useState('')
  const [ isSearchResult, setIsSearchResult ] = useState(false)
  const [ searchResult, setSearchResult ] = useState()
  const [ selectedGame, setSelectedGame ] = useState([])
  const [ platforms, setPlatforms ] = useState([])
  const [ tagInput, setTagInput ] = useState('')
  const [ inputtedTags, setInputtedTags ] = useState([])
  const [ invitationInput, setInvitationInput ] = useState('')
  const [ foundCollarboratedUser, setFoundCollarboratedUser ] = useState()
  const [ invitationStatus, setInvitationStatus ] = useState([])

  const platformSelections = [
    {
      name: 'YouTube',
      // icons: 
    },
    {
      name: 'Twitch',
    },
    {
      name: 'Kick',
    },
  ]

  const platformClickHandler = (e, list) => {
    setPlatforms((prev) => [
      ...prev,
      list.name
    ])
  }

  const platformRemoveHandler = (e, list) => {
    setPlatforms(platforms.filter((platform) => platform !== list.name))
  }


  const searchHandler = (e) => {
    if(searchGameInput === '') {
      setIsSearchResult(false)
    }
    setSearchGameInput(e.target.value)
  }

  const addTagHandler = (e) => {
    setInputtedTags((prev) => [
    ...prev,
      tagInput
    ])
    setTagInput('')
  }

  const removeTagHandler = (e, tag) => {
    setInputtedTags(inputtedTags.filter((t) => t!== tag))
  }

  const removeGameHandler = (e, game) => {
    setSelectedGame(selectedGame.filter((selected) => selected.name !== game))
  }

  const selectGameHandler = (e, game) => {
    setSelectedGame((prev) => [
      ...prev,
      game
    ])
    setSearchGameInput('')
    setIsSearchResult(false)
  }

  const sendInvitation = async (e, streamer) => {
    // 1. set current status for invitaion for pending
    let defaultData = {
      status: 'pending',
      streamer: streamer
    }
    setInvitationStatus((prev) => [
      ...prev,
      defaultData
    ])

    // 2. set sending data (user info, invited user, current event info)
    let sendingData = {
      loggedUser: loggedUser,
      invitedUser: streamer,
      event: event
    }

    let invitationSending
    // 3. call invitation service
    try {
      invitationSending = await invitationSetUp(sendingData)
    } catch (err) {
      console.log(err)
    }
    
    // 4. set returned status for the server call
  }

  const inviteButtonDistributor = (selectedInvitation, streamerInfo) => {
    // clicked invite [status, streamer], foundCollaboaratedUser
    let foundStreamerFromSavedInvitation = selectedInvitation.find(streamer => streamer.streamer._id === streamerInfo._id)

    if(!foundStreamerFromSavedInvitation) {
      return (
        <button 
          onClick={(e) => sendInvitation(e, streamerInfo)}
          className='bg-sky-700 px-3 py-1 rounded-md text-white'
        >
          Invite
        </button>
      )
    }

    if(foundStreamerFromSavedInvitation.status === 'pending') {
      return (
        <button 
          className='bg-sky-900 px-3 py-1 rounded-md text-white'
        >
          Loading...
        </button>
      )
    }

    if(foundStreamerFromSavedInvitation.status === 'sent') {
      return (
        <button 
          className='bg-sky-900 px-3 py-1 rounded-md text-white'
        >
          Sent
        </button>
      )
    }

  }

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if(searchGameInput !== '') {
        setIsSearchResult(true)
        const request = await searchGame(searchGameInput)
        if(request) {
          console.log(request, 'at useEffect')
          setSearchResult(request)
        }
      }
      if(searchGameInput === '') {
        setIsSearchResult(false)
      }
    }, 500)
    return () => clearTimeout(delayDebounce)
  }, [searchGameInput])

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if(invitationInput!== '') {
        const request = await searchCollarboUser(invitationInput)

        if(request.length > 0) {
          setFoundCollarboratedUser(request)
        }

        if(!request) {
          setFoundCollarboratedUser('Error at getting streamer information')
        }
      }
    }, 500)
    return () => clearTimeout(delayDebounce)
  },[invitationInput])

  useEffect(() => {
    return console.log(invitationStatus, 'at useEffect', event, 'event')
  },[invitationStatus])

  const invitationPopup = () => {
    if(invitationInput === '') {
      return null
    }

    if(foundCollarboratedUser === 'not found') {
      return (
        <div>
          <p className='text-red-600 text-center'>{foundCollarboratedUser}</p>
        </div>
      )
    }

    if(foundCollarboratedUser && foundCollarboratedUser !== 'not found' && foundCollarboratedUser.length > 0 ) {
      return (
        <div
          className='mt-2 p-2 bg-white rounded-md text-slate-700 flex flex-col divide-y-[1px] divide-slate-300 text-xs'
        >
          {foundCollarboratedUser.map((streamer, i) => {
            return (
              <div
                key={streamer._id + ' found streamer at invitation popup'}
                className='flex flex-row flex-nowrap justify-between items-center py-1.5 px-2'
              >
                <p>{streamer.nickname}</p>
                {inviteButtonDistributor(invitationStatus, streamer)}
              </div>
            )
          })}
        </div>
      )
    }

  }

  // Platforms **
  // streamingPlatforms **
  // tags **
  // collarboratedUsers
  // eventEntryDue
  // eventImage
  // eventMaxNum
  // eventStatus

  return (
    <Transition.Root show={finishSetupModal} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setFinishSetupModal}>
        <Transition.Child
          as={Fragment}
        >
          <motion.div 
            className='fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity block'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          ></motion.div>
        </Transition.Child>

        <div 
          className='fixed inset-0 z-20 w-screen overflow-y-auto'
        >
          <div className='flex bg-black/20 min-h-full items-center justify-center'>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
            >
              <Dialog.Panel className='flex w-full transform transition max-w-sm text-base'>
                <motion.div
                  className='relative w-full overflow-hidden bg-slate-700 shadow-2xl py-6 rounded-lg'
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.45}}
                >
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setFinishSetupModal(false)}><MdClose className='w-6 h-6'/></button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div className='px-4'>
                      <p className='font-bold text-lg'>Create Collarboration Event</p>
                    </div>

                    <div className='scrollbar-track-sky-950 scrollbar-thumb-white/40'>
                      <div className='overflow-auto scrollbar-thin max-h-96 flex flex-col gap-4 px-4'>
                        {/* eventName */}
                        <div>
                          <input 
                            type='text'
                            className='w-full rounded-lg text-slate-800 text-sm'
                            placeholder='search' 
                            onChange={(e) => searchHandler(e)}
                            value={searchGameInput}
                          />
                          {selectedGame.length > 0 && <div className='flex flex-row gap-2 py-1'>
                            {selectedGame.map((game) => {
                              return (
                                <div
                                  key={'entered Tags' + game.name}
                                  className='flex flex-row items-center bg-white/10 rounded-full px-2 py-0.5'
                                >
                                  <p className='block py-1 px-2 text-xs'>{game.name}</p>
                                  <MdClose className='w-4 h-4 p-1 bg-white/20 rounded-full hover:cursor-pointer' onClick={(e) => removeGameHandler(e, game.name)}/>
                                </div>
                              )
                            })}
                          </div>
                          }
                          {isSearchResult && (
                            <div className='flex flex-col gap-2 p-2 bg-white/20 mt-2 rounded-lg'>
                              {searchResult && searchResult.map((result) => {
                                return (
                                  <div
                                    key={result.id + 'result games'}
                                    className='flex flex-row gap-2 items-center text-sm hover:bg-sky-900/80 hover:cursor-pointer p-2 rounded-lg'
                                    onClick={(e) => selectGameHandler(e, result)}
                                  >
                                    <div
                                      className='w-[9%] aspect-[3/4]'
                                    >
                                      {
                                        result.cover &&
                                        <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${result.cover.image_id}.jpg`} />
                                      }
                                    </div>
                                    <div>
                                      <p>{result.name}</p>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>

                        {/* streaming platforms */}
                        <div>
                          <p className='text-xs'>Please choose the platforms for this event</p>
                          <div className='flex flex-row flex-nowrap justify-start text-sm gap-2 py-2'>
                            {platformSelections.map((list) => {
                              let addedPlatform = platforms.find((platform) => platform.includes(list.name))
                              if(addedPlatform) {
                                return (
                                  <div 
                                    className='flex flex-row justify-center items-center gap-1 px-2 py-1 rounded-full bg-sky-700 hover:cursor-pointer'
                                    key={list.name + 'added platform'}
                                    onClick={(e) => platformRemoveHandler(e, list)}
                                  >
                                    <MdOutlineCheckCircleOutline className='w-4 h-4' />
                                    <p>{list.name}</p>
                                  </div>
                                )
                              }
                              return (
                                <div 
                                  className='flex flex-row justify-center items-center gap-1 px-2 py-1 rounded-full hover:cursor-pointer bg-white/10'
                                  onClick={(e) => platformClickHandler(e, list)}
                                  key={list.name + ' platform  options'}
                                >
                                  <MdOutlineCircle  className='w-4 h-4' />
                                  <p>{list.name}</p>
                                </div>
                              ) 
                              })
                            }
                          </div>
                        </div>

                        {/* Tags */}
                        
                        <div>
                          <p>Tags</p>
                          <div className='flex flex-row flex-nowrap'>
                            <input type='text' value={tagInput} onChange={(e) => setTagInput(e.target.value)} className='text-slate-800 text-sm px-4 py-2 rounded-l-lg w-full' placeholder='Enter tags' />
                            <button 
                              className='w-24 bg-sky-800 rounded-r-lg text-xs hover:bg-sky-600'
                              onClick={addTagHandler}
                            >
                              Add Tag
                            </button>
                          </div>
                          <div className='flex flex-row gap-2 py-1'>
                            {inputtedTags.length > 0 && inputtedTags.map((tag) => {
                              return (
                                <div
                                  key={'entered Tags' + tag}
                                  className='flex flex-row items-center bg-white/10 rounded-full px-2 py-0.5'
                                >
                                  <p className='block py-1 px-2 text-xs'>{tag}</p>
                                  <MdClose className='w-4 h-4 p-1 bg-white/20 rounded-full hover:cursor-pointer' onClick={(e) => removeTagHandler(e, tag)}/>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* collarborated users */}
                        <div>
                          <p>Send out Invitations</p>
                          <div>
                            <input type='text' value={invitationInput} onChange={(e) => setInvitationInput(e.target.value)} className='w-full rounded-lg text-slate-800 text-sm' placeholder='Search Username'/>
                            {invitationPopup()}
                          </div>
                        </div>
                        {/* upload images? */}

                        <div>
                          <p>upload image drop zone display</p>
                        </div>


                        {/* submit button */}
                        <button className='w-full bg-sky-800 py-2 rounded-lg hover:bg-sky-900'>Create Event</button>

                      </div>
                    </div>

                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default FinishCollaboModal;

// team image
// team background image
// number of team members
// team streaming platform 
//  edit button form team setting

// home, text, collaboration
// add event button