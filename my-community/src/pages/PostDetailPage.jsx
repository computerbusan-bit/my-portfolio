import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container, Box, Typography, Chip, Avatar, Divider, Button,
  TextField, IconButton, CircularProgress, Skeleton, Paper,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import { supabase } from '../lib/supabaseClient'

const CATEGORIES = {
  wod: 'WOD',
  tips: '팁 & 노하우',
  nutrition: '영양',
  gear: '장비',
  general: '자유',
}

const CATEGORY_COLORS = {
  wod: 'error',
  tips: 'warning',
  nutrition: 'success',
  gear: 'info',
  general: 'default',
}

export default function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [commentAuthor, setCommentAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  async function fetchPost() {
    const { data } = await supabase
      .from('community_posts')
      .select('*')
      .eq('id', id)
      .single()
    setPost(data)
    setLoading(false)
  }

  async function fetchComments() {
    const { data } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  async function handleLike() {
    if (liked || !post) return
    const newLikes = post.likes + 1
    const { error } = await supabase
      .from('community_posts')
      .update({ likes: newLikes })
      .eq('id', id)
    if (!error) {
      setPost({ ...post, likes: newLikes })
      setLiked(true)
    }
  }

  async function handleSubmitComment(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmitting(true)
    const { error } = await supabase.from('community_comments').insert({
      post_id: id,
      content: commentText.trim(),
      author: commentAuthor.trim() || '익명',
    })
    if (!error) {
      setCommentText('')
      setCommentAuthor('')
      await fetchComments()
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Skeleton variant="rectangular" height={300} />
      </Container>
    )
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="text.secondary">게시글을 찾을 수 없습니다.</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>홈으로</Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* 뒤로가기 */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        목록으로
      </Button>

      {/* 게시글 헤더 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #141414, #1a0a00)',
          border: '1px solid #2a2a2a',
          borderRadius: 1,
          p: { xs: 3, md: 5 },
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip
            label={CATEGORIES[post.category] || post.category}
            color={CATEGORY_COLORS[post.category] || 'default'}
            size="small"
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            {new Date(post.created_at).toLocaleString('ko-KR')}
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.3 }}>
          {post.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.dark', fontSize: 14 }}>
            {post.author[0].toUpperCase()}
          </Avatar>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {post.author}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="body1"
          sx={{ lineHeight: 1.9, color: 'text.primary', whiteSpace: 'pre-wrap' }}
        >
          {post.content}
        </Typography>

        {/* 좋아요 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Box
            onClick={handleLike}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              cursor: liked ? 'default' : 'pointer',
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: liked ? 'secondary.main' : '#2a2a2a',
              transition: 'all 0.2s',
              '&:hover': !liked ? { borderColor: 'secondary.main', bgcolor: 'rgba(229,57,53,0.05)' } : {},
            }}
          >
            {liked ? (
              <FavoriteIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
            )}
            <Typography variant="h6" color={liked ? 'secondary.main' : 'text.secondary'} fontWeight={700}>
              {post.likes}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 댓글 섹션 */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          댓글 {comments.length}개
        </Typography>

        {/* 댓글 작성 */}
        <Paper
          component="form"
          onSubmit={handleSubmitComment}
          sx={{ p: 3, mb: 3, bgcolor: 'background.paper', border: '1px solid #2a2a2a' }}
          elevation={0}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="닉네임 (선택)"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="댓글을 작성하세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <IconButton
              type="submit"
              disabled={submitting || !commentText.trim()}
              sx={{
                alignSelf: 'flex-end',
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 1,
                '&:hover': { bgcolor: 'primary.dark' },
                '&:disabled': { bgcolor: '#2a2a2a' },
                width: 48,
                height: 48,
              }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            </IconButton>
          </Box>
        </Paper>

        {/* 댓글 목록 */}
        {comments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography color="text.secondary">첫 댓글을 남겨보세요!</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  p: 2.5,
                  border: '1px solid #2a2a2a',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.dark', fontSize: 12 }}>
                    {comment.author[0].toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    {comment.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                    {new Date(comment.created_at).toLocaleString('ko-KR')}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ pl: 4.5, color: 'text.primary', whiteSpace: 'pre-wrap' }}>
                  {comment.content}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  )
}
