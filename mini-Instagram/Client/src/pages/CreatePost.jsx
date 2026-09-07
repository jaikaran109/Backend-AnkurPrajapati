import React from 'react'
import axios from 'axios'

const CreatePost = () => {



    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        axios.post("http://localhost:3000/create-post",formData)
        .then((res) => {
            console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
            alert("Error creating post")
            
        })
    }



  return (
    <section className='create-post-section'>
        <h1> Create Post</h1>



        <form onSubmit={handleSubmit}>
            <input type="file" name="image" accept='image/*' />
            <input type="text" name='caption' placeholder='Enter Caption' required  />
            <button type="submit">Submit</button>


        </form>
    </section>
  )
}

export default CreatePost