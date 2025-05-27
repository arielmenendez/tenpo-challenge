import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPhotos } from '../../api/photos';
import type { Photo } from '../../api/photos';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 30;

const PhotoList = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // page = 0 is first call

  const loadMore = async () => {
    const start = page * PAGE_SIZE;
    const newPhotos = await getPhotos(start, PAGE_SIZE);

    setPhotos((prev) => [...prev, ...newPhotos]);
    setPage((prev) => prev + 1);

    if (newPhotos.length < PAGE_SIZE) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Photo List (infinite scroll from API)</h1>
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
                src={`https://picsum.photos/seed/${photo.id}/150/150`}
                alt={photo.title}
                width="100%"
                loading="lazy"
              />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default PhotoList;
