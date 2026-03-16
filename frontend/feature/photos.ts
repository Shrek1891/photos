import {createSlice} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
}


const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: [] as Photo[],
    },
    reducers: {
        addPhoto: (state, action: PayloadAction<Photo>) => {
            state.photos.push(action.payload);
        },
    }});

export const { addPhoto } = photosSlice.actions;