import { useAuthStore } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPhotos } from '../../api/photos'
import type { Photo } from '../../api/photos'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import InfiniteScroll from 'react-infinite-scroll-component'

const PAGE_SIZE = 30

const PhotoList = () => {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const [allPhotos, setAllPhotos] = useState<Photo[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  // Fetch all photos once
  useEffect(() => {
    const fetchAll = async () => {
      const all = await getPhotos()
      setAllPhotos(all)
    }

    fetchAll()
  }, [])

  // Load first page once photos are ready
  useEffect(() => {
    if (allPhotos.length > 0) {
      loadMore()
    }
  }, [allPhotos])

  const loadMore = () => {
    const nextChunk = allPhotos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    setPhotos((prev) => [...prev, ...nextChunk])
    setPage((prev) => prev + 1)

    if (page * PAGE_SIZE >= allPhotos.length) {
      setHasMore(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Photo List (infinite scroll)</h1>
      <Button onClick={handleLogout}>Log out</Button>

      <InfiniteScroll
        dataLength={photos.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {photos.map((photo) => (
            <li
              key={photo.id}
              style={{ border: '1px solid #ccc', padding: '0.5rem' }}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                width="100%"
                loading="lazy"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    'https://placehold.co/150x150?text=No+Image')
                }
              />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default PhotoList
