import request from 'supertest';
import app from '../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Order from '../models/Order';
import { userModel } from '../models/userModel';
import Product from '../models/Product';
import { IProduct, IUser } from '../utils/interface';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Order Operations', () => {
  let userId: string;
  let productId: string;

  beforeEach(async () => {
    await Order.deleteMany({});
    await userModel.deleteMany({});
    await Product.deleteMany({});

    const user = await userModel.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    }) as IUser;
    userId = user._id.toString();

    const product = await Product.create({
      name: 'Test Product',
      description: 'This is a test product',
      price: 19.99,
      category: 'Test Category',
      brand: 'Test Brand',
      sku: 'TEST123',
      inStock: 100,
    }) as IProduct;
    productId = product._id.toString();
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        user: userId,
        products: [{ product: productId, quantity: 2 }],
        totalAmount: 39.98,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.user).toBe(userId);
    expect(res.body.products).toHaveLength(1);
    expect(res.body.totalAmount).toBe(39.98);
  });

  it('should get all orders', async () => {
    await Order.create({
      user: userId,
      products: [{ product: productId, quantity: 2 }],
      totalAmount: 39.98,
    });

    await Order.create({
      user: userId,
      products: [{ product: productId, quantity: 1 }],
      totalAmount: 19.99,
    });

    const res = await request(app).get('/api/orders');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('should update order status', async () => {
    const order = await Order.create({
      user: userId,
      products: [{ product: productId, quantity: 2 }],
      totalAmount: 39.98,
      status: 'Pending',
    });

    const res = await request(app)
      .put(`/api/orders/${order._id}/status`)
      .send({ status: 'Shipped' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Shipped');
  });
});

