import { createSlice } from '@reduxjs/toolkit';

export const PalabraInitialState = {
  palabras: []
};

export const palabraSlice = createSlice({
  name: 'palabra',
  initialState: PalabraInitialState,
  reducers: {
    createPalabra: (state, action) => { 
      return {
        palabras: [...state.palabras, { ...action.payload }]
      };
    },
    modifyPalabra: (state, action) => {
      const aMod = state.palabras.find((x) => x.id === action.payload.id);
      if (aMod) {
        const newValue = { ...aMod, ...action.payload };
        return {
          palabras: [...state.palabras.filter((x) => x.id !== action.payload.id), newValue]
        };
      }
      return state;
    },
    deletePalabra: (state, action) => {
      return { palabras: [...state.palabras.filter((x) => x.id !== action.payload.id)] };
    },
    resetPalabra: () => PalabraInitialState
  }
});

export const { createPalabra, modifyPalabra, resetPalabra, deletePalabra } = palabraSlice.actions;

export default palabraSlice.reducer;
