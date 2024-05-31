import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const IGDBTopRated = ({topRated}) => {

  const router = useRouter()

  const gameImageClickHandler = (e, slug, id) => {
    router.push(`/games/${slug}?id=${id}`)
  }

  return (
    <div className='px-8'>
      <p className="text-white">Top Rated</p>
      {topRated && <div
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2"
      >
        {topRated.map((game) => {
          return <div key={game.id}>
            {game.cover && <motion.div
              onClick={(e) => gameImageClickHandler(e, game.slug, game.id)}
              className="hover:cursor-pointer rounded-lg aspect-[3/4] bg-white bg-center bg-cover"
              style={{backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg)`}}
              initial={{scale: 0.98, opacity: 0.75}}
              whileHover={{scale: 1.05, opacity: 1}}
              transition={{duration: 0.1}}
            >
            </motion.div>}
          </div>
        })}
        </div>
      }
    </div>
  );
}
export default IGDBTopRated;