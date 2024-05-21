import { getNewGames } from "@/redux/service/IGDBServices";
import { useSelector } from 'react-redux'

const IGDBNewGames = () => {

  let IGDBToken = useSelector((state) => state.redux.IGDB_Token)

  const getNewGamesData = async () => {
    if(IGDBToken) {
      const newGames = await getNewGames(IGDBToken)
    }
  }

  return (
    <div>
      <p className="text-white">New Games</p>
      <button onClick={getNewGamesData}>get data</button>
    </div>
  );
}
export default IGDBNewGames;