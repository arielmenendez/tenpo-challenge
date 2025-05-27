import client from './client';

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const getPhotos = async (): Promise<Photo[]> => {
  const { data } = await client.get<Photo[]>('/photos?_limit=2000')

  return data.map((photo) => ({
    ...photo,
    thumbnailUrl: `https://placehold.co/150x150?text=${encodeURIComponent(photo.id)}`,
    url: `https://placehold.co/600x400?text=Photo+${encodeURIComponent(photo.id)}`,
  }))
}
