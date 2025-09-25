import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'

export default function Home() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/api/comments/')
      setComments(response.data)
      setError('')
    } catch (error) {
      setError('Failed to load comments. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const handleCommentAdded = (newComment) => {
    setComments(prev => [newComment, ...prev])
  }

  const handleCommentDeleted = (commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId))
  }

  return (
    <>
      <Head>
        <title>Enterprise Comment System</title>
        <meta name="description" content="A modern comment system built with Django and Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>Enterprise Comment System</h1>
          <p>Share your thoughts and engage with the community</p>
        </header>

        <main>
          <CommentForm onCommentAdded={handleCommentAdded} />

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading">Loading comments...</div>
          ) : (
            <CommentList 
              comments={comments} 
              onCommentDeleted={handleCommentDeleted}
            />
          )}
        </main>
      </div>
    </>
  )
}