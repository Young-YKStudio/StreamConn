import { Suspense } from "react"
import Loading from '../../../loading'
import TextRenderSocket from './textRenderSocket'

const Channel_Text = async ({ channel }) => {

  return (
    <Suspense fallback={<Loading />}>
      {/* <TextRender channel={initChannelData} /> */}
      <TextRenderSocket channel={channel}/>
    </Suspense>
  )
}
export default Channel_Text;