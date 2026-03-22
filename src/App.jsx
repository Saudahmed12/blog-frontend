import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PostList from './pages/PostList'
import PostForm from './pages/PostForm'
import PostDetail from './pages/PostDetail'
import Categories from './pages/Categories'
import Tags from './pages/Tags'
import Drafts from './pages/Drafts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/posts/:postId/edit" element={<PostForm />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/drafts" element={<Drafts />} />
      </Routes>
    </BrowserRouter>
  )
}