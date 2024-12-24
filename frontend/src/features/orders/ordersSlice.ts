import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Order {
  id: string
  customerName: string
  items: { productId: string; quantity: number }[]
  totalAmount: number
  status: 'pending' | 'completed' | 'canceled'
}

interface OrdersState {
  items: Order[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: OrdersState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch('/api/orders')
  return (await response.json()) as Order[]
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderAdded(state, action: PayloadAction<Order>) {
      state.items.push(action.payload)
    },
    orderUpdated(state, action: PayloadAction<Order>) {
      const index = state.items.findIndex(order => order.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    orderRemoved(state, action: PayloadAction<string>) {
      state.items = state.items.filter(order => order.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  },
})

export const { orderAdded, orderUpdated, orderRemoved } = ordersSlice.actions

export default ordersSlice.reducer
