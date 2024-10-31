export const ShuffleArray = (array) => {
  let workingArray = array
  for (let i = workingArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
  }
  return workingArray;
}

export const ShuffleArrayLimit8 = (array) => {
  let workingArray = []
  while (workingArray.length >= 0 && workingArray.length <= 8) {
    let randomPickedStreamer = array[Math.floor(Math.random() * array.length)]
    let duplicatedStreamer = workingArray.find((streamer) => streamer == randomPickedStreamer)
    if(!duplicatedStreamer) {
      workingArray.push(randomPickedStreamer)
    }
    if(workingArray.length === array.length) {
      return workingArray
    }
  }
  return workingArray
}

export const SortingUserArrayHighToLow = (array) => {

  let sortedArray = array.toSorted(function(a, b){return a.follows.length - b.follows.length})

  console.log(sortedArray)
}