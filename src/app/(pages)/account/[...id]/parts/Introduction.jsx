const IndividualPageIntro = ({user}) => {
  return (
    <section className="pt-20">
      {/* profile */}
      {/* leftside */}
      <div>
        {/* photo */}
        <div>
          <img src={user.profile} />
        </div>
        {/* information */}
        <div>
          {/* nickname */}
          <p>{user.email}</p>
          {/* number of followers */}
          {/* platform icons */}
        </div>
      </div>
      {/* right side */}
      <div>
        <button>follow</button>
        <button>donate user</button>
        <button>join membership</button>
      </div>
    </section>
  );
}
export default IndividualPageIntro;