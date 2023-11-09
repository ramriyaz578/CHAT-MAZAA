import React from 'react'
import { Link } from 'react-router-dom'


const Post = ({ post }) => {

    return (
        <article className='post'>

            <Link to={`post/${post.id}`}>       {/* don't add any space between `post/ ${post.id}` -- It makes adds a code in route like  -- /%20 */}
                <h2> {post.title}</h2>

                <p className='postDate'>
                    {post.dateTime}
                </p>

            </Link>
            {/* <Image src={post.image} alt='no image' /> */}
            <p className='postBody'>
                {
                    (post.body).length <= 25 ?
                        post.body : `${(post.body).slice(0, 100)}...`
                }
            </p>

        </article>
    )
}

export default Post