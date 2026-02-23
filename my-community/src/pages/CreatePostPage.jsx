import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Box, Typography, TextField, Button, Select, MenuItem,
  FormControl, InputLabel, CircularProgress, Alert,
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { supabase } from '../lib/supabaseClient'

const CATEGORIES = [
  { value: 'wod', label: 'WOD' },
  { value: 'tips', label: '팁 & 노하우' },
  { value: 'nutrition', label: '영양' },
  { value: 'gear', label: '장비' },
  { value: 'general', label: '자유' },
]

export default function CreatePostPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    category: 'general',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) {
      setError('제목과 내용을 입력해주세요.')
      return
    }
    setSubmitting(true)
    setError('')

    const { data, error: err } = await supabase
      .from('community_posts')
      .insert({
        title: form.title.trim(),
        content: form.content.trim(),
        author: form.author.trim() || '익명',
        category: form.category,
      })
      .select()
      .single()

    if (err) {
      setError('게시글 작성 중 오류가 발생했습니다.')
      setSubmitting(false)
      return
    }

    navigate(`/posts/${data.id}`)
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #141414, #1a0a00)',
          border: '1px solid #2a2a2a',
          borderRadius: 1,
          p: { xs: 3, md: 5 },
        }}
      >
        {/* 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <CreateIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ textTransform: 'uppercase' }}>
              새 게시글 작성
            </Typography>
            <Typography variant="body2" color="text.secondary">
              커뮤니티에 당신의 경험을 공유하세요
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              name="author"
              label="닉네임 (선택)"
              value={form.author}
              onChange={handleChange}
              placeholder="익명"
              sx={{ flex: 1, minWidth: 200 }}
            />
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>카테고리</InputLabel>
              <Select
                name="category"
                value={form.category}
                label="카테고리"
                onChange={handleChange}
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            name="title"
            label="제목"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
            placeholder="오늘의 WOD 후기, 팁, 질문 등..."
          />

          <TextField
            name="content"
            label="내용"
            value={form.content}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={10}
            placeholder="자세한 내용을 작성해주세요..."
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              disabled={submitting}
              sx={{ borderColor: '#2a2a2a', color: 'text.secondary' }}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CreateIcon />}
              sx={{ px: 4 }}
            >
              {submitting ? '게시 중...' : '게시하기'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
