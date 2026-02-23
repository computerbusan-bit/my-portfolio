import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container, Box, Typography, TextField, Button, Alert, CircularProgress, Divider,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { supabase } from '../lib/supabaseClient'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    setLoading(true)
    setError('')

    const { error: err } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    })

    if (err) {
      if (err.message === 'Email not confirmed') {
        setError('이메일 인증이 완료되지 않았습니다. 가입 시 받은 인증 메일을 확인해주세요.')
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      }
      setLoading(false)
      return
    }

    navigate('/')
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #141414, #1a0a00)',
          border: '1px solid #2a2a2a',
          borderRadius: 1,
          p: { xs: 3, md: 5 },
        }}
      >
        {/* 헤더 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <FitnessCenterIcon sx={{ color: 'primary.main', fontSize: 36 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #FF6B00, #E53935)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CrossFit World
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={800} sx={{ textTransform: 'uppercase' }}>
            로그인
          </Typography>
          <Typography variant="body2" color="text.secondary">
            커뮤니티에 참여하려면 로그인하세요
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            name="email"
            label="이메일"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="email"
            placeholder="example@email.com"
          />
          <TextField
            name="password"
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <LoginIcon />}
            sx={{ mt: 1, py: 1.5 }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#2a2a2a' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            아직 계정이 없으신가요?{' '}
            <Typography
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 700,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              회원가입
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
