import { useState, useEffect, useCallback } from 'react'
import { Box, Typography, CircularProgress, Button, Stack } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { supabase } from '../utils/supabaseClient'
import PostCard from './PostCard'
import PostForm from './PostForm'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('sns_posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleLiked = (postId, newCount) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes_count: newCount } : p))
    )
  }

  return (
    <Box>
      <PostForm onPostCreated={fetchPosts} />

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          피드
        </Typography>
        <Button
          size="small"
          startIcon={<RefreshIcon />}
          onClick={fetchPosts}
          disabled={loading}
        >
          새로고침
        </Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography color="text.secondary">
            아직 게시물이 없습니다. 첫 게시물을 작성해보세요!
          </Typography>
        </Box>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onLiked={handleLiked} />
        ))
      )}
    </Box>
  )
}

export default Feed
