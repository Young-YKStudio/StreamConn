const FeaturedStreamers = ({streamers}) => {

  return (
    <section className="pt-20 flex flex-col">
      <p>Featured Streamers</p>
      <div>
        {streamers && streamers.map((streamer) => (
          <div key={streamer._id + ' featured'}>
            <p>{streamer.nickname}</p>
            <p>{streamer.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default FeaturedStreamers;