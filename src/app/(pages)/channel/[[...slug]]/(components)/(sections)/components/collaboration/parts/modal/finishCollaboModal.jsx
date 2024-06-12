import { Dialog, Transition, Switch } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Fragment, useState, useEffect } from 'react';
import { MdClose, MdLock } from 'react-icons/md'
import { searchGame } from '@/redux/service/IGDBServices'
import { MdOutlineCircle, MdOutlineCheckCircleOutline } from "react-icons/md";

const FinishCollaboModal = ({event, finishSetupModal, setFinishSetupModal}) => {

  const [ searchGameInput, setSearchGameInput ] = useState('')
  const [ isSearchResult, setIsSearchResult ] = useState(false)
  const [ searchResult, setSearchResult ] = useState()
  const [ selectedGame, setSelectedGame ] = useState([])
  const [ platforms, setPlatforms ] = useState([])

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

  const selectGameHandler = (e, game) => {
    setSelectedGame((prev) => [
      ...prev,
      game
    ])
    setSearchGameInput('')
    setIsSearchResult(false)
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
    return () => console.log(platforms, 'at useEffect')
  },[platforms])

  // Platforms
  // streamingPlatforms
  // tags
  // eventEntryDue
  // eventImage
  // collarboratedUsers
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
                          {selectedGame.length > 0 && <div>
                            {selectedGame.map((game) => {
                              return <div key={game.id + 'selectedGame'}>{game.name}</div>
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
                          {platformSelections.map((list) => {
                            let addedPlatform = platforms.find((platform) => platform.includes(list.name))
                            if(addedPlatform) {
                              return (
                                <div 
                                  className='flex flex-row items-center gap-1'
                                  key={list.name + 'added platform'}
                                  onClick={(e) => platformRemoveHandler(e, list)}
                                >
                                  <MdOutlineCheckCircleOutline />
                                  <p>{list.name}</p>
                                </div>
                              )
                            }
                            return (
                              <div 
                                className='flex flex-row items-center gap-1'
                                onClick={(e) => platformClickHandler(e, list)}
                                key={list.name + ' platform  options'}
                              >
                                <MdOutlineCircle />
                                <p>{list.name}</p>
                              </div>
                            ) 
                            })
                          }
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