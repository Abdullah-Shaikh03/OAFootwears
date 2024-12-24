import request from 'supertest';
import app from '../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Inventory from '../models/Inventory';
import Product from '../models/Product';
import Store from '../models/Store';
import { IProduct, IStore } from '../utils/interface';

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

describe('Inventory Operations', () => {
  let productId: string;
  let storeId: string;

  beforeEach(async () => {
    await Inventory.deleteMany({});
    await Product.deleteMany({});
    await Store.deleteMany({});

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

    const store = await Store.create({
      name: 'Test Store',
      address: '123 Test St',
      manager: new mongoose.Types.ObjectId(),
    }) as IStore;
    storeId = store._id.toString();
  });

  it('should update inventory', async () => {
    const res = await request(app)
      .put('/api/inventory')
      .send({
        productId,
        storeId,
        quantity: 50,
      });

    expect(res.status).toBe(200);
    expect(res.body.product).toBe(productId);
    expect(res.body.store).toBe(storeId);
    expect(res.body.quantity).toBe(50);
  });

  it('should get all inventory', async () => {
    await Inventory.create({
      product: productId,
      store: storeId,
      quantity: 50,
    });

    const res = await request(app).get('/api/inventory');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].product._id).toBe(productId);
    expect(res.body[0].store._id).toBe(storeId);
    expect(res.body[0].quantity).toBe(50);
  });

  it('should get inventory by store', async () => {
    await Inventory.create({
      product: productId,
      store: storeId,
      quantity: 50,
    });

    const res = await request(app).get(`/api/inventory/${storeId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].product._id).toBe(productId);
    expect(res.body[0].quantity).toBe(50);
  });
});

