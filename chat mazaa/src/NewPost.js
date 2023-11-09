import React from 'react'

const NewPost = ({handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
    return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor='postTitle' > Title: </label>
                <input
                    id='postTitle'
                    type='text'
                    required
                    value={postTitle}
                    onChange={(e)=> setPostTitle(e.target.value)}

/>

                <label htmlFor='postBody' > Body: </label>
                <textarea
                    id='postBody'
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}

 />

                <button type='submit'>
                    SHARE IT
                </button>
            </form>
        </main>
    )
}

export default NewPost