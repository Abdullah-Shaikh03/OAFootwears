import request from 'supertest';
import app from '../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Product from '../models/Product';

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

describe('Product Operations', () => {
  beforeEach(async () => {
    await Product.deleteMany({});
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
        category: 'Test Category',
        brand: 'Test Brand',
        sku: 'TEST123',
        inStock: 100,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Product');
  });

  it('should get all products', async () => {
    await Product.create({
      name: 'Test Product 1',
      description: 'This is test product 1',
      price: 19.99,
      category: 'Test Category',
      brand: 'Test Brand',
      sku: 'TEST123',
      inStock: 100,
    });

    await Product.create({
      name: 'Test Product 2',
      description: 'This is test product 2',
      price: 29.99,
      category: 'Test Category',
      brand: 'Test Brand',
      sku: 'TEST456',
      inStock: 50,
    });

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('should update a product', async () => {
    const product = await Product.create({
      name: 'Test Product',
      description: 'This is a test product',
      price: 19.99,
      category: 'Test Category',
      brand: 'Test Brand',
      sku: 'TEST123',
      inStock: 100,
    });

    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .send({
        name: 'Updated Test Product',
        price: 24.99,
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Test Product');
    expect(res.body.price).toBe(24.99);
  });

  it('should delete a product', async () => {
    const product = await Product.create({
      name: 'Test Product',
      description: 'This is a test product',
      price: 19.99,
      category: 'Test Category',
      brand: 'Test Brand',
      sku: 'TEST123',
      inStock: 100,
    });

    const res = await request(app).delete(`/api/products/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Product deleted successfully');

    const deletedProduct = await Product.findById(product._id);
    expect(deletedProduct).toBeNull();
  });
});

