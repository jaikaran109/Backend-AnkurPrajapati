import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios';  // connect backend and frontend

const Feed = () => {

    const [posts, setPosts] = useState([
        {
            _id:"1",
            image:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption : "YOOOOOOOOOOO",
        }
    ])

    useEffect(()=>{  // ye iss liye kr rhe h taki api bss ek baar hi call ho multiple time nhi

        axios.get("http://localhost:3000/posts") // backend me jo post wali api/route h usko call kiya
        .then((res) => {
            setPosts(res.data.posts)
        })

    },[]) 

  return (
    <section className='feed-section'>
        
        {
            posts.length > 0 ? (
                posts.map((posts) => (
                    <div key={posts._id} className='post-card'>
                        <img src={posts.image} alt={posts.caption} />
                        <p>{posts.caption}</p>
                    </div>
                ))
            ) : (
                <h1>No Post Available</h1>
            )
        }

    </section>
  )
}

export default Feed