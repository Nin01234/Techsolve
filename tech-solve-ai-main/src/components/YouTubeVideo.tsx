import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Clock, Eye, ThumbsUp, Download, BookOpen, ExternalLink, Share2, Heart, MessageCircle } from 'lucide-react'

interface YouTubeVideoProps {
  videoId: string
  title: string
  description: string
  duration: string
  views: string
  likes: string
  category: string
  thumbnail?: string
}

export const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  title,
  description,
  duration,
  views,
  likes,
  category,
  thumbnail
}) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative group">
          <div className="aspect-video bg-gray-200 relative overflow-hidden">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
          {title}
        </CardTitle>
        
        <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-3 h-3" />
              <span>{likes}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const YouTubeVideoModal: React.FC<{
  videoId: string
  title: string
  isOpen: boolean
  onClose: () => void
  videoData?: any
}> = ({ videoId, title, isOpen, onClose, videoData }) => {
  if (!isOpen) return null

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`

  const handleWatchNow = () => {
    window.open(youtubeUrl, '_blank')
  }

  const handleDownloadOffline = () => {
    // In a real app, this would trigger a download process
    // For now, we'll show a notification
    alert('Download feature would be implemented with proper video download functionality')
  }

  const handleRelatedGuides = () => {
    // In a real app, this would navigate to related guides
    // For now, we'll show a notification
    alert('Related guides feature would navigate to relevant documentation and guides')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: youtubeUrl
      })
    } else {
      navigator.clipboard.writeText(youtubeUrl)
      alert('Link copied to clipboard!')
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative w-full max-w-6xl bg-white rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Video Info */}
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{videoData?.views || '1.2M'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{videoData?.likes || '25K'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{videoData?.duration || '15:30'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(videoData?.difficulty || 'Intermediate')}>
                    {videoData?.difficulty || 'Intermediate'}
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-700">{videoData?.description || 'Comprehensive tutorial covering all aspects of the topic with step-by-step instructions.'}</p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleWatchNow} className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Watch Now
                </Button>
                <Button variant="outline" onClick={handleDownloadOffline} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Offline
                </Button>
                <Button variant="outline" onClick={handleRelatedGuides} className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Related Guides
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Video Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Author:</span>
                  <span className="font-medium">{videoData?.author || 'Tech Expert'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{videoData?.category || 'Hardware'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uploaded:</span>
                  <span className="font-medium">{videoData?.uploadDate || '2 weeks ago'}</span>
                </div>
              </div>
            </div>
            
            {/* Chapters */}
            {videoData?.chapters && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Chapters</h4>
                <div className="space-y-2">
                  {videoData.chapters.map((chapter: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">
                      <span className="truncate">{chapter.title}</span>
                      <span className="text-gray-500 text-xs">{chapter.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Videos */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Related Videos</h4>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                    <div className="w-16 h-12 bg-gray-200 rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium line-clamp-2">Related Tutorial {i}</h5>
                      <p className="text-xs text-gray-500 mt-1">5:30 • 12K views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
