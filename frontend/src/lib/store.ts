import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '@/features/products/productSlice'
import ordersReducer from '@/features/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

