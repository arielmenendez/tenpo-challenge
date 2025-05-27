import client from './client';

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const getPhotos = async (
  start: number,
  limit: number
): Promise<Photo[]> => {
  const { data } = await client.get<Photo[]>(
    `/photos?_start=${start}&_limit=${limit}`
  );
  return data;
};
