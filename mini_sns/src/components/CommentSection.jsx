import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Stack,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material'
import { supabase } from '../utils/supabaseClient'

const CommentItem = ({ comment }) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: 'secondary.light' }}>
      {comment.user_name[0].toUpperCase()}
    </Avatar>
    <Box
      sx={{
        bgcolor: 'grey.100',
        borderRadius: 2,
        px: 1.5,
        py: 1,
        flex: 1,
        minWidth: 0,
      }}
    >
      <Typography variant="caption" fontWeight={700} color="text.primary">
        {comment.user_name}
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
        {comment.content}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(comment.created_at).toLocaleString('ko-KR', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Typography>
    </Box>
  </Stack>
)

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from('sns_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    setComments(data ?? [])
    setLoading(false)
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    const { error } = await supabase.from('sns_comments').insert({
      post_id: postId,
      user_name: userName.trim() || '익명',
      content: content.trim(),
    })
    if (!error) {
      setContent('')
      fetchComments()
    }
    setSubmitting(false)
  }

  return (
    <Box sx={{ pt: 1 }}>
      <Divider sx={{ mb: 1.5 }} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <Stack spacing={1} sx={{ mb: 1.5 }}>
          {comments.length === 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ pl: 1 }}>
              첫 댓글을 남겨보세요!
            </Typography>
          )}
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </Stack>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <TextField
            size="small"
            placeholder="닉네임"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ width: 100, flexShrink: 0 }}
          />
          <TextField
            size="small"
            fullWidth
            placeholder="댓글 입력..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={submitting || !content.trim()}
            sx={{ flexShrink: 0 }}
          >
            등록
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default CommentSection
