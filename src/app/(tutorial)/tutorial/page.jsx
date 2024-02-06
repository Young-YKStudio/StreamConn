'use client'// 'use server'
import { EditButton } from '../../components/buttons/Edit.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Tutorial() {
  // async function getData() {
  const editHandler = (e, id) => {
    console.log('Edit postID:', id)
  }
  
  const deleteHandler = (e, id) => {
    console.log('Delete postID:', id)
  }

  const [ fetchedData, setFetchedData ] = useState()

  useEffect(() => {
    const request = async () => {
      const res = await axios.get('/api/getPost')
      if(res.data) {
        setFetchedData(res.data)
      }
    }
    return (() => {
      request()
    })
  },[])
//   try {
    // const res = await fetch('http://localhost:3000/api/getPost')
  
    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error('Failed to fetch data')
    // }

    // // console.log('RES: ', res);
    // let posts = await res.json();
    // return object;

//   } catch(e) {
//     console.log('ERROR:', e)
//   }
// }

  return (
    <div className="pt-20">
      {/* <p>Server Landing</p> */}
      {fetchedData && fetchedData.map(post => (
      <li key={post._id}>{post.title} {post.body}
      {/* <button>adf</button> */}
        {/* <EditButton onClick={(e) => editHandler(e, post._id)} /> */}
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => editHandler(e, post._id)}>Edit</button>
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => deleteHandler(e, post._id)}>Delete</button>
      </li>
    ))}
    </div>
  );
}

// 'use client'

// import axios from 'axios'
// import { useState, useEffect } from "react"
// import Allposts from '../../components/pages/allposts/page'

// async function getData() {
//   try {
//     const res = await fetch('http://localhost:3000/api/getPost')
  
//     if (!res.ok) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error('Failed to fetch data')
//     }

//     // console.log('RES: ', res);
//     let object = await res.json();
//     return object;

//   } catch(e) {
//     console.log('ERROR:', e)
//   }
// }

// const tutorial = (props) => {
//   const [ title, setTitle ] = useState('')
//   const [ body, setBody ] = useState('')
//   const [ user, setUser ] = useState('')
//   const [ posts, setPosts ] = useState([])
//   const [ incomingPosts, setIncomingPosts ] = useState([])

//   useEffect(() => {
//     setIncomingPosts(getData())
//   }, []);

//   const addHandler = async () => {
//     console.log('Add clicked')

//     let data = {
//       title: title,
//       body: body,
//       user: user,
//     }

//     try {
//       const request = await axios.post('/api/addPost', data)
//       if(request.data) {
//         console.log(request.data, 'add call success')
//         getHandler()
//       }
//     } catch (e) {
//       console.log(e, 'add call fail')
//     }
//   }

//   const getHandler = async () => {
//     try {
//       const request = await axios.get('/api/getPost')
//       if (request.data) {
//         // console.log(request.data)
//         setPosts(request.data)
//       }
//     } catch (e) {
//       console.log('displayPost error:', e)
//     }
//   }

//   const editHandler = async (e, id) => {
//     console.log('Edit postID:', id)
//   }

//   const deleteHandler = async (e, id) => {
    
//     let data = { 
//       _id: id, 
//       title: 'title',
//       body: 'body',
//       user: 'user',
//     }

//     console.log('Delete postID:', data)

//     try {
//       const request = await axios.post('/api/deletePost', data)
//       if(request.data) {
//         console.log(request.data, 'del call success')
//         getHandler()
//       }
//     } catch (e) {
//       console.log(e, 'del call fail')
//     }
//   }

//   console.log('data:', incomingPosts)

//   return (
//     <div className="pt-24">
//       <div><Allposts/></div>
//       <div className='flex flex-col gap-5'>
//         <p>CLIENT PAGE LANDING</p>
//         { incomingPosts.length > 0 && incomingPosts.map((pst) => {
//             return <div key={pst._id} className='flex gap-5'>
//               <p>Title: {pst.title}, Body: {pst.body}, User: {pst.user}</p>
//               <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => editHandler(e, pst._id)}>Edit</button>
//               <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => deleteHandler(e, pst._id)}>Delete</button>
//             </div>
//         })}
//       </div>

//       <div>
//         <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={getHandler}>Get Post</button>
//       </div>
//       <div className='flex flex-col gap-5'>
//         { posts.length > 0 && posts.map((post) => {
//             return <div key={post._id} className='flex gap-5'>
//               <p>Title: {post.title}, Body: {post.body}, User: {post.user}</p>
//               <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => editHandler(e, post._id)}>Edit</button>
//               <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => deleteHandler(e, post._id)}>Delete</button>
//             </div>
//         })}
//       </div>
//       <div className='flex flex-row gap-5 absolute bottom-5'>
//         <label>Title:</label>
//         <input type='text' value={title} className='rounded-md text-black' onChange={e => setTitle(e.target.value)} />
//         <label>Body:</label>
//         <input type='text' value={body} className='rounded-md text-black' onChange={e => setBody(e.target.value)} />
//         <label>User:</label>
//         <input type='text' value={user} className='rounded-md text-black' onChange={e => setUser(e.target.value)} />
//         <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={addHandler}>Post</button>
//       </div>
//     </div>
//   )
// }

// export default tutorial;

// // export async function getServerSideProps() {
// //   export async function getStaticProps() {
// //   // const requestToAPI = await axios.get('http://localhost:3000/api/getPost')
// //   const requestToAPI = await fetch('http://localhost:3000/api/getPost/route.jsx')

// //   return {
// //     props: {
// //       data: requestToAPI.data,
// //     }
// //   }
// // }

// // async function getData() {
//   // export async function getStaticProps() {
//   //   // 'use server'
//   //  try {
//   //    const res = await axios.get('/api/getPost')
  
//   //    if (!res.ok) {
//   //      // This will activate the closest `error.js` Error Boundary
//   //      throw new Error('Failed to fetch data')
//   //    } else {
//   //      console.log(res.json())
//   //      return res.json()
//   //    }
//   //  }
//   //  catch (e) {
//   //   console.log('E:', e)
//   //  }
//   //   // The return value is *not* serialized
//   //   // You can return Date, Map, Set, etc.
    
//   // }
  


