import React from 'react'
import {useParams} from "react-router-dom"
import BlogCard from '../components/BlogCard'

const BlogPage = () => {
  const {id} = useParams()
  return (
    <BlogCard idBlog={id} />
  )
}

export default BlogPage