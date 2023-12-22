import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    games: [],
    page: 1,
    hasMore: true,
  },
  reducers: {
    fetchGames: (state, action) => {
      state.games = [...state.games, ...action.payload];
      state.page += 1;
      state.hasMore = action.payload.length > 0;
    },
  },
});

export const { fetchGames } = gameSlice.actions;
export default gameSlice.reducer;

