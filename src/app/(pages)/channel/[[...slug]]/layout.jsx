const ChannelLayout = ({children, profile, tabs, section, sidebar}) => {

  return (
    <div className="flex flex-row flex-nowrap h-full w-full">
      {sidebar}
      <div className="w-full flex flex-col items-center">
        {profile}
        {tabs}
        {section}
      </div>
    </div>
  );
}
export default ChannelLayout;