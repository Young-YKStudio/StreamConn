
const IGDBNewGames = ({newReleases}) => {

  const buttonClickHandler = (e, slug) => {
    console.log(slug)
  }

  return (
    <div>
      <p className="text-white">New Releases</p>
      {newReleases && <div
        className="flex flex-wrap justify-center"
      >
        {newReleases.map((game) => {
          return <div key={game.id}>
            {game.cover && <div>
              <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt={game.cover.image_id} />
              <button onClick={(e) => buttonClickHandler(e, game.slug)}>Temp Click</button>
            </div>}
          </div>
        })}
        </div>
      }
    </div>
  );
}
export default IGDBNewGames;