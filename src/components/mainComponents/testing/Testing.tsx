import { Box, Button, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'

import { PopupSequenceType } from '@/types/popupSequence'

import PopupSequence from '../share/PopupSequence'

const Testing = () => {
  const [activePopups, setActivePopups] = useState<PopupSequenceType[] | null>(null)

  // Story example - same popups used for both modes
  const storyPopups: PopupSequenceType[] = [
    {
      id: 'story-1',
      title: 'Chapter 1: The Beginning',
      content: (
        <Box>
          <Typography>
            Once upon a time, in a land far away, there lived a young developer who discovered the
            power of chained popups...
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Click Next to continue (auto-advance disabled).
          </Typography>
        </Box>
      ),
      duration: 0
    },
    {
      id: 'story-2',
      title: 'Chapter 2: The Discovery',
      content: (
        <Box>
          <Typography>
            The developer realized they could create engaging user experiences by chaining multiple
            popups together.
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Take your time reading this.
          </Typography>
        </Box>
      ),
      duration: 0
    },
    {
      id: 'story-3',
      title: 'Chapter 3: The End',
      content: (
        <Box textAlign='center'>
          <Typography paragraph>
            And they lived happily ever after, creating amazing popup experiences! 🎉
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Click close to finish.
          </Typography>
        </Box>
      ),
      duration: 0 // No duration - always requires manual close
    }
  ]

  const handleStartStory = () => {
    setActivePopups(storyPopups)
  }

  const handleComplete = useCallback(() => {
    setActivePopups(null)
  }, [])

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Stack spacing={2} direction='row' sx={{ mb: 4 }}>
        <Button variant='contained' onClick={handleStartStory}>
          Start Story Sequence
        </Button>
      </Stack>

      {/* Popup system */}
      {activePopups && (
        <PopupSequence
          popups={activePopups}
          disableAutoAdvance={true}
          onAllComplete={handleComplete}
        />
      )}
    </Box>
  )
}

export default Testing
