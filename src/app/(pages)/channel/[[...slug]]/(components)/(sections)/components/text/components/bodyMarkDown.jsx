import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export const BodyMarkDown = ({text}) => {

  const mdBody = <ReactMarkdown
    remarkPlugins={[remarkGfm, remarkBreaks]}
    className='prose bg-slate-300 p-4 rounded-md text-sm w-full'
  >
    {text}
  </ReactMarkdown>

  return mdBody
}