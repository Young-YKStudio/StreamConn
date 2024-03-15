const SectionTabs = ({currentSection, setCurrentSection}) => {
  return (
    <nav className="flex flex-row gap-2">
      <button onClick={() => setCurrentSection('home')}>Home</button>
      <button onClick={() => setCurrentSection('channels')}>Channels</button>
    </nav>
  );
}
export default SectionTabs;