
import axios from 'axios'

async function getData() {
  try {
    const res = await fetch('http://localhost:3000/api/getPost')
  

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  console.log('RES:', res)
  return res.json()
} catch(e) {
  console.log('ERROR:', e)
}
}
 
export default async function Test() {
  const data = await getData()
 
  console.log(data)

  return <main></main>
}

// export async function getServerSideProps() {
// // export async function getStaticProps() {
//   try {
//     const res = await axios.get('/api/getPost')
//     const projects = await res.json()
  
//     return { props: { projects } }
//   }
//   catch (e) {
//     console.log('E:', e)
//   }
// }
 
// export default function Test({ projects }) {
//   return (
//     <ul>
//       {projects.map((project) => (
//         <li key={project._id}>{project.title}</li>
//       ))}
//     </ul>
//   )
// }