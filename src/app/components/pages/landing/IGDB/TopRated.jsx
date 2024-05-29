import { useRouter } from 'next/navigation'

const IGDBTopRated = ({topRated}) => {

  const router = useRouter()

  const gameImageClickHandler = (e, slug, id) => {
    router.push(`/games/${slug}?id=${id}`)
  }

  return (
    <div>
      <p className="text-white">Top Rated</p>
      {topRated && <div
        className="grid grid-cols-4 gap-2"
      >
        {topRated.map((game) => {
          return <div key={game.id}>
            {game.cover && <div
              onClick={(e) => gameImageClickHandler(e, game.slug, game.id)}
              className="hover:cursor-pointer"
            >
              <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt={game.cover.image_id} />
            </div>}
          </div>
        })}
        </div>
      }
    </div>
  );
}
export default IGDBTopRated;