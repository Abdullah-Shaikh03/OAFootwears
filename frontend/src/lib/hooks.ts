import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from './api'
import { IProduct, IOrder } from './types'

export function useProducts() {
  return useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: api.getProducts,
  })
}

export function useOrders() {
  return useQuery<IOrder[], Error>({
    queryKey: ['orders'],
    queryFn: api.getOrders,
  })
}

export function useRandomImages(count: number = 3) {
  return useQuery<string[], Error>({
    queryKey: ['randomImages', count],
    queryFn: () => api.getRandomImages(count),
  })
}

export function useAddProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

