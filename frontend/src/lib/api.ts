import { IProduct, IOrder, IUser } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

export async function getProducts(): Promise<IProduct[]> {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export async function getOrders(): Promise<IOrder[]> {
  const response = await fetch(`${API_URL}/orders`)
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  return response.json()
}

export async function getRandomImages(count: number = 3): Promise<string[]> {
  const response = await fetch(`${API_URL}/random-images?count=${count}`)
  if (!response.ok) {
    throw new Error('Failed to fetch random images')
  }
  return response.json()
}

export async function signUp(user: Omit<IUser, '_id'>): Promise<{ user: IUser; token: string }> {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  if (!response.ok) {
    throw new Error('Failed to sign up')
  }
  return response.json()
}

export async function login(credentials: { email: string; password: string }): Promise<{ user: IUser; token: string }> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    throw new Error('Failed to login')
  }
  return response.json()
}

export async function addProduct(product: Omit<IProduct, '_id'>): Promise<IProduct> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('Failed to add product')
  }
  return response.json()
}

export async function updateProduct(product: IProduct): Promise<IProduct> {
  const response = await fetch(`${API_URL}/products/${product._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('Failed to update product')
  }
  return response.json()
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete product')
  }
}

