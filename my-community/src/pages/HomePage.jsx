import { useState, useEffect } from 'react'
import {
  Container, Box, Typography, Card, CardContent, CardActionArea,
  Chip, Avatar, Skeleton, Select, MenuItem, FormControl, InputLabel,
  TextField, InputAdornment, Divider,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import SearchIcon from '@mui/icons-material/Search'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const CATEGORIES = {
  all: '전체',
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

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [commentCounts, setCommentCounts] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [category])

  async function fetchPosts() {
    setLoading(true)
    let query = supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (category !== 'all') {
      query = query.eq('category', category)
    }

    const { data } = await query
    if (data) {
      setPosts(data)
      fetchCommentCounts(data.map((p) => p.id))
    }
    setLoading(false)
  }

  async function fetchCommentCounts(ids) {
    if (!ids.length) return
    const counts = {}
    await Promise.all(
      ids.map(async (id) => {
        const { count } = await supabase
          .from('community_comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', id)
        counts[id] = count || 0
      })
    )
    setCommentCounts(counts)
  }

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box>
      {/* 히어로 섹션 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%)',
          borderBottom: '1px solid #2a2a2a',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,107,0,0.08) 0%, transparent 70%)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <WhatshotIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '5rem' },
                background: 'linear-gradient(90deg, #FF6B00 0%, #E53935 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              FORGED IN FIRE
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: 'text.secondary', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              CrossFit World Community
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 필터 & 검색 */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={category}
              label="카테고리"
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.entries(CATEGORIES).map(([k, v]) => (
                <MenuItem key={k} value={k}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="게시글 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* 게시글 목록 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
              ))
            : filtered.map((post) => (
                <Card key={post.id}>
                  <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Chip
                          label={CATEGORIES[post.category] || post.category}
                          color={CATEGORY_COLORS[post.category] || 'default'}
                          size="small"
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                          {new Date(post.created_at).toLocaleDateString('ko-KR')}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.content}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.dark', fontSize: 12 }}>
                          {post.author[0].toUpperCase()}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary">
                          {post.author}
                        </Typography>
                        <Box sx={{ ml: 'auto', display: 'flex', gap: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FavoriteIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                            <Typography variant="caption" color="text.secondary">
                              {post.likes}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CommentIcon sx={{ fontSize: 14, color: 'primary.main' }} />
                            <Typography variant="caption" color="text.secondary">
                              {commentCounts[post.id] ?? '-'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
        </Box>

        {!loading && filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography color="text.secondary">게시글이 없습니다.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}
