import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('/api/products')
  return (await response.json()) as Product[]
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productAdded(state, action: PayloadAction<Product>) {
      state.items.push(action.payload)
    },
    productUpdated(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(product => product.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    productRemoved(state, action: PayloadAction<string>) {
      state.items = state.items.filter(product => product.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export const { productAdded, productUpdated, productRemoved } = productsSlice.actions

export default productsSlice.reducer

