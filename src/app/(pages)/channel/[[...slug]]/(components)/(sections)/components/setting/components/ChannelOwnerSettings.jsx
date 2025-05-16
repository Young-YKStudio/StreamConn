import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { updateChannelSettings, deleteChannel } from '@/redux/service/settingsService'
import DeleteChannelWarning from './deleteChannelWarning'

const ChannelOwnerSettings = ({channel}) => {

  const [ isPrivacyOpen, setIsPrivacyOpen ] = useState(false)
  const [ channelsSettings, setChannelsSettings ] = useState([])
  const [ isDeleteModal, setIsDeleteModal ] = useState(false)
  const [ selectedDeleteChannel, setSelectedDelteChannel ] = useState()

  useEffect(() => {
    return (() => {
      setChannelsSettings(channel.channelOwner.channels)
    })
  },[channel])

  const togglePrivacyHandler = (e) => {
    setIsPrivacyOpen(!isPrivacyOpen)
  }

  const changeEventTypeHandler = async (e, channelData) => {
    let sendingData = {
      channelOwner: channelData.channelOwner,
      channelId: channelData._id,
      private: !channelData.isPrivate
    }

    let res = await updateChannelSettings(sendingData)
    if(res) {
      setChannelsSettings(res)
    }
  }

  const deleteButtonHandler = async (e, channel) => {

    // let sendingData = {
    //   channelOwner: channel.channelOwner,
    //   channelId: channel._id,  // }

    // let res = await deleteChannel(sendingData)
    setSelectedDelteChannel(channel)
    setIsDeleteModal(true)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="w-full">
      <h3>Channel owner Settings</h3>

      {/* channel mod authority */}
      {/* authority for admin */}
      {/* 1. full authority */}
      {/* 2. specified authority */}
      {/* 2-1. delete/modify text channel */}
      {/* 2-2. add/delete/modify collarbo channel */}
      {/* 2-3. add/delete/modify Participation channel */}
      <div>
        <p>Moderators</p>
      </div>

      {/* channel view authority */}
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row gap-1'>
          <p>Channels</p>
          {channel && <p>({channel.channelOwner.channels.length})</p>}
        </div>
        <button onClick={togglePrivacyHandler}>
          {isPrivacyOpen ? 'Close' : 'Open'}
        </button>
      </div>
      {/* list of channels */}
      {isPrivacyOpen &&
        <div>
          {channelsSettings.length > 0 && channelsSettings.map((channelList) => {
            return (
              <div
                key={channelList._id + 'listedChannels'}
                className="flex flex-row flex-nowrap p-2"
              >
                <div>
                  <p>{channelList.channelName}</p>
                  <p>{channelList.channelType}</p>
                </div>
                <Switch
                  checked={channelList.isPrivate}
                  onChange={(e) => changeEventTypeHandler(e, channelList)}
                  className={classNames(
                    channelList.isPrivate ? 'bg-sky-500' : 'bg-gray-200',
                    'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0'
                  )}
                >
                  <span
                    className={classNames(
                      channelList.isPrivate ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={classNames(
                        channelList.isPrivate ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      )}
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </Switch>
                <button
                  onClick={(e) => deleteButtonHandler(e, channelList)}
                >
                  delete channel
                </button>
              </div>
            )
          })}
        </div>
      }
      {
        isDeleteModal && <DeleteChannelWarning selectedDeleteChannel={selectedDeleteChannel} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/>
      }
    </div>
  )
}

export default ChannelOwnerSettings;