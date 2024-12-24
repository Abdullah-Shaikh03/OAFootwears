import request from 'supertest';
import app from '../../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Store from '../models/Store';
import { userModel } from '../models/userModel';
import { IUser } from '../utils/interface';

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

describe('Store Operations', () => {
  let managerId: string;

  beforeEach(async () => {
    await Store.deleteMany({});
    await userModel.deleteMany({});

    const manager = await userModel.create({
      name: 'Store Manager',
      email: 'manager@example.com',
      password: 'password123',
      role: 'store_manager',
    }) as IUser;
    managerId = manager._id.toString();
  });

  it('should create a new store', async () => {
    const res = await request(app)
      .post('/api/stores')
      .send({
        name: 'Test Store',
        address: '123 Test St',
        manager: managerId,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Store');
    expect(res.body.address).toBe('123 Test St');
    expect(res.body.manager).toBe(managerId);
  });

  it('should get all stores', async () => {
    await Store.create({
      name: 'Test Store 1',
      address: '123 Test St',
      manager: managerId,
    });

    await Store.create({
      name: 'Test Store 2',
      address: '456 Test Ave',
      manager: managerId,
    });

    const res = await request(app).get('/api/stores');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('should update a store', async () => {
    const store = await Store.create({
      name: 'Test Store',
      address: '123 Test St',
      manager: managerId,
    });

    const res = await request(app)
      .put(`/api/stores/${store._id}`)
      .send({
        name: 'Updated Test Store',
        address: '456 Test Ave',
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Test Store');
    expect(res.body.address).toBe('456 Test Ave');
  });

  it('should delete a store', async () => {
    const store = await Store.create({
      name: 'Test Store',
      address: '123 Test St',
      manager: managerId,
    });

    const res = await request(app).delete(`/api/stores/${store._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Store deleted successfully');

    const deletedStore = await Store.findById(store._id);
    expect(deletedStore).toBeNull();
  });
});

