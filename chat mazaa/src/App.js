import { Link, Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
// import Post from "./Post";
// import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import api from './api/posts'


function App() {

  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState('')

  const [searchResults, setSearchResults] = useState([])

  const [postTitle, setPostTitle] = useState('')

  const [postBody, setPostBody] = useState('')

  const navigate = useNavigate();  // It navigates a page when you wants to switch a page to default

  useEffect(() => {
    const fetchPosts = async () => {
      try {

        // api -- get 

        const response = await api.get('/posts');
        setPosts(response.data);

      } catch (err) {

        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }

      }
    }

    fetchPosts();

  }, [])

  useEffect(() => {
    const filteredResult = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResult.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {

    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');

    const newPost = { id, title: postTitle, dateTime, body: postBody };

    try {

      // api -- post

      const response = await api.post('./posts', newPost)

      const allPosts = [...posts, response.data];

      // const allPosts = [...posts, newPost];

      setPosts(allPosts);

      setPostTitle('');

      setPostBody('');

      navigate('/')

    } catch (err) {

      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }

    }
  }

  const handleDelete = async (id) => {
    try {

      // api -- delete
      await api.delete(`/posts/${id}`)

      const postsList = posts.filter(post => post.id !== id);
      
      setPosts(postsList);
      navigate('/');
 
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

  }

  return (
    <div className="App">

      <Header/>
      <Nav
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path="/" element={<Home
          posts={searchResults}
        />} />
        <Route path="about" element={<About />} />

        <Route path="post">

          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />

          <Route path=":id" element={<PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />

        </Route>

        <Route path="*" element={<Missing />} />

      </Routes>

      <Footer />

    </div>
  );
}

export default App;
