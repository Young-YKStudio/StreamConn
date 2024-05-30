import GamePageClient from './clientComponent'
import GameSideBar from './(parts)/(sidebar)/sidebar';

const GamePage = ({params}) => {
  
  let gameSlug = params.slug[0]

  return (
    <div className='flex flex-row flex-nowrap h-full w-full'>
      <GameSideBar />
      <GamePageClient gameSlug={gameSlug} />
    </div>
  );
}

export default GamePage;

// TODO: load side bar