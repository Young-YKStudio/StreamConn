export const channels = [
  {name: 'Home'},
  {name: 'Event'},
  {name: 'Channel 1'},
]

export const tabButtonStyles = (currentSection, channel) => {
  if(currentSection !== channel) {
    return 'text-gray-400 hover:text-white px-3 py-1.5 truncate'
  }
  if(currentSection === channel) {
    return 'rounded-md px-3 py-1.5 font-medium bg-sky-800'
  }
}