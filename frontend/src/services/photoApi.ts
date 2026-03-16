import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Photo {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}


export const photoApi = createApi({
  reducerPath: 'photoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: () => '/photos',
    }),
    createPhoto: builder.mutation({
      query: (newPhoto) => ({
        url: '/photos',
        method: 'POST',
        body: newPhoto,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(photoApi.util.updateQueryData('getPhotos', undefined, (draft) => {
            draft.photos.push(data.photo);
          }));
        } catch (error) {
          console.error('Failed to create photo:', error);
        }       
        },
    }),
    deletePhoto: builder.mutation({
      query: (id) => ({
        url: `/photos/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(photoApi.util.updateQueryData('getPhotos', undefined, (draft) => {
            draft.photos = draft.photos.filter((photo: Photo) => photo._id !== id);
          }));
        } catch (error) {
          console.error('Failed to delete photo:', error);
        }
      },
    }),
    updatePhoto: builder.mutation({
      query: ({ id, ...updatedPhoto }) => ({
        url: `/photos/${id}`,
        method: 'PUT',
        body: updatedPhoto,
      }),
      onQueryStarted: async ({ id,  }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(photoApi.util.updateQueryData('getPhotos', undefined, (draft) => {
            const index = draft.photos.findIndex((photo: Photo) => photo._id === id);
            if (index !== -1) {
              draft.photos[index] = data.photo;
            }
          }));
        } catch (error) {
          console.error('Failed to update photo:', error);
        }
      },
    }),
  }),
});

export const { useGetPhotosQuery, useCreatePhotoMutation, useDeletePhotoMutation, useUpdatePhotoMutation } = photoApi;