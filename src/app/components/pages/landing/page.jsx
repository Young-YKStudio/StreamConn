import LandingRender from './landingRender'
import { Suspense } from 'react'


const LandingServer = async () => {

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <LandingRender />
    </Suspense>
  );
}
export default LandingServer;