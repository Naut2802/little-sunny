import React from 'react'
import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { getHotNews } from '~/data/newsService'

function NewsHero() {
  const [hotNewsItem, setHotNewsItem] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getHotNews().then((data) => {
      setHotNewsItem(data)
    })
  }, [])

  if (!hotNewsItem) return (
    <Box
      sx={{
        maxWidth: 'lg',
        mx: 'auto',
        py: 6,
        px: 2
      }}
    >
    </Box>
  )

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '600px',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: `url(${hotNewsItem.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) => (`linear-gradient(to top, ${alpha(theme.palette.secondary.main, 0.8)}, transparent 100%)`)
        }}
      />

      {/* Content */}
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          position: 'relative',
          zIndex: 10,
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          px: 2,
          py: 4
        }}
      >
        <Box sx={{ color: 'white' }}>
          {/* Badge */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <PlayArrowIcon sx={{ fontSize: { xs: '12px', sm: '16px', md: '24px' }, fontWeight: '500' }} />
            <Typography sx={{ fontSize: { xs: '12px', sm: '16px', md: '24px' }, fontWeight: '500' }}>
              Tin nổi bật
            </Typography>
          </Stack>

          {/* Main Heading */}
          <Typography
            variant="h4"
            sx={{
              lineHeight: 1.2,
              fontWeight: '900',
              fontSize: { xs: '0.875rem', sm: '1.25rem', md: '2.215rem' },
              mb: 4
            }}
          >
            {hotNewsItem.title}
          </Typography>

          {/* Read More Button */}
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/news/${hotNewsItem.id}`)}
            sx={{
              width: { xs: 'auto', md: 'auto' },
              borderRadius: '50px',
              bgcolor: 'white',
              boxShadow: 'none',
              color: 'secondary.main',
              fontSize: { xs: '16px', md: '20px' },
              fontWeight: 'bold',
              textTransform: 'none',
              padding: '6px 20px',
              '&:hover': {
                boxShadow: 'none',
                bgcolor: (theme) => (theme.palette.secondary.main),
                color: 'white'
              }
            }}
          >
            Đọc chi tiết
          </Button>
        </Box>
      </Box>
    </Box>
  )
};

export default NewsHero