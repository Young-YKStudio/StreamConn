// call channels
import TabRenderContainer from "./components/tabRenderContainer";
import { Suspense } from "react";

const ChannelTabs = ({params}) => {

  const channelUser = params.slug[1]
  const channelName = params.slug[0]

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TabRenderContainer channelUser={channelUser} channelName={channelName} />
    </Suspense>
  );
}
export default ChannelTabs;