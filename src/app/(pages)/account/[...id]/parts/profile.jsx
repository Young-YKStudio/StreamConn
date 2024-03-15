'use client'

const ProfileIndividual = ({user}) => {
  console.log(user, 'profile')
  return (
    <section>
      {/* Left Side */}
      <div>
        {/* Image */}
        <img src={user.profile}  className="w-20 h-20 rounded-full"/>

        {/* streamer info */}
        <div>
          <div>
            <p>{user.nickname}</p>
          </div>
        </div>
      </div>

    </section>
  );
}
export default ProfileIndividual;