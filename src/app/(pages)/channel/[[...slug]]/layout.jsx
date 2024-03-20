const ChannelLayout = ({children, profile, tabs, section, sidebar}) => {
  return (
    <div className="flex flex-row flex-nowrap h-full">
      {sidebar}
      <div className="w-full">
        {profile}
        {tabs}
        {section}
      </div>
      {children}
    </div>
  );
}
export default ChannelLayout;