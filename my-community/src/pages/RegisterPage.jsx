import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container, Box, Typography, TextField, Button, Alert, CircularProgress, Divider,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { supabase } from '../lib/supabaseClient'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    if (form.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    setLoading(true)
    setError('')

    const { error: err } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
    })

    if (err) {
      setError(err.message === 'User already registered'
        ? '이미 사용 중인 이메일입니다.'
        : '회원가입 중 오류가 발생했습니다.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #141414, #1a0a00)',
            border: '1px solid #2a2a2a',
            borderRadius: 1,
            p: { xs: 3, md: 5 },
            textAlign: 'center',
          }}
        >
          <FitnessCenterIcon sx={{ color: 'primary.main', fontSize: 56, mb: 2 }} />
          <Typography variant="h5" fontWeight={800} sx={{ textTransform: 'uppercase', mb: 1 }}>
            가입 완료!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            입력하신 이메일로 확인 메일을 발송했습니다.
            <br />
            메일을 확인한 후 로그인해주세요.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{ px: 4, py: 1.5 }}
          >
            로그인하러 가기
          </Button>
        </Box>
      </Container>
    )
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
            회원가입
          </Typography>
          <Typography variant="body2" color="text.secondary">
            새 계정을 만들고 커뮤니티에 참여하세요
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
            autoComplete="new-password"
            placeholder="6자 이상 입력하세요"
            helperText="최소 6자 이상"
          />
          <TextField
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={form.passwordConfirm}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="new-password"
            placeholder="비밀번호를 다시 입력하세요"
            error={form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm}
            helperText={
              form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm
                ? '비밀번호가 일치하지 않습니다'
                : ' '
            }
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <PersonAddIcon />}
            sx={{ mt: 1, py: 1.5 }}
          >
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#2a2a2a' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            이미 계정이 있으신가요?{' '}
            <Typography
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 700,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              로그인
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
