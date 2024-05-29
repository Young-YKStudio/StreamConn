import GamePageClient from './clientComponent'

const GamePage = ({params}) => {
  
  let gameSlug = params.slug[0]

  return (
    <GamePageClient gameSlug={gameSlug} />
  );
}

export default GamePage;

// TODO: load side bar