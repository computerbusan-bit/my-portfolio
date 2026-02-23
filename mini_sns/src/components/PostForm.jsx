import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Stack,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import SendIcon from '@mui/icons-material/Send'
import { supabase } from '../utils/supabaseClient'

const PostForm = ({ onPostCreated }) => {
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [showImageField, setShowImageField] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    const { error } = await supabase.from('sns_posts').insert({
      user_name: userName.trim() || '익명',
      content: content.trim(),
      image_url: imageUrl.trim() || null,
    })

    if (!error) {
      setContent('')
      setImageUrl('')
      setShowImageField(false)
      onPostCreated()
    }
    setLoading(false)
  }

  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar sx={{ bgcolor: 'primary.main', mt: 0.5 }}>
            {userName ? userName[0].toUpperCase() : '?'}
          </Avatar>
          <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="닉네임 (선택)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="무슨 생각을 하고 계신가요?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Collapse in={showImageField}>
              <TextField
                fullWidth
                size="small"
                placeholder="이미지 URL 입력"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                sx={{ mb: 1 }}
              />
            </Collapse>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Tooltip title="이미지 URL 추가">
                <IconButton
                  size="small"
                  onClick={() => setShowImageField((prev) => !prev)}
                  color={showImageField ? 'primary' : 'default'}
                >
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Tooltip>
              <Button
                type="submit"
                variant="contained"
                size="small"
                endIcon={<SendIcon />}
                disabled={loading || !content.trim()}
              >
                {loading ? '게시 중...' : '게시하기'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PostForm
