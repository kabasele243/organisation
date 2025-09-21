import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';

describe('API Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('Health Check', () => {
    it('should return 200 and health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'OK',
        timestamp: expect.any(String)
      });
    });
  });

  describe('User API', () => {
    let createdUserId: string;

    describe('POST /api/users', () => {
      it('should create a user successfully', async () => {
        const userData = {
          name: 'John Doe',
          email: 'john@example.com'
        };

        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(201);

        expect(response.body).toEqual({
          id: expect.any(String),
          name: userData.name,
          email: userData.email,
          createdAt: expect.any(String)
        });

        createdUserId = response.body.id;
      });

      it('should return 400 for missing name', async () => {
        const userData = {
          email: 'test@example.com'
        };

        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(400);

        expect(response.body).toEqual({
          error: 'Name and email are required'
        });
      });

      it('should return 400 for missing email', async () => {
        const userData = {
          name: 'Test User'
        };

        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(400);

        expect(response.body).toEqual({
          error: 'Name and email are required'
        });
      });

      it('should return 400 for invalid email format', async () => {
        const userData = {
          name: 'Test User',
          email: 'invalid-email'
        };

        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(400);

        expect(response.body).toEqual({
          error: 'Invalid email format'
        });
      });

      it('should return 400 for duplicate email', async () => {
        const userData = {
          name: 'Jane Doe',
          email: 'john@example.com' // Same email as first user
        };

        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(400);

        expect(response.body).toEqual({
          error: 'User with this email already exists'
        });
      });
    });

    describe('GET /api/users', () => {
      it('should return all users', async () => {
        const response = await request(app)
          .get('/api/users')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          createdAt: expect.any(String)
        });
      });
    });

    describe('GET /api/users/:id', () => {
      it('should return user by id', async () => {
        const response = await request(app)
          .get(`/api/users/${createdUserId}`)
          .expect(200);

        expect(response.body).toEqual({
          id: createdUserId,
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: expect.any(String)
        });
      });

      it('should return 404 for non-existent user', async () => {
        const nonExistentId = '00000000-0000-0000-0000-000000000000';

        const response = await request(app)
          .get(`/api/users/${nonExistentId}`)
          .expect(404);

        expect(response.body).toEqual({
          error: 'User not found'
        });
      });

    });

    describe('DELETE /api/users/:id', () => {
      it('should delete user successfully', async () => {
        await request(app)
          .delete(`/api/users/${createdUserId}`)
          .expect(204);

        // Verify user is deleted
        await request(app)
          .get(`/api/users/${createdUserId}`)
          .expect(404);
      });

      it('should return 400 for non-existent user', async () => {
        const nonExistentId = '00000000-0000-0000-0000-000000000000';

        const response = await request(app)
          .delete(`/api/users/${nonExistentId}`)
          .expect(400);

        expect(response.body).toEqual({
          error: 'User not found'
        });
      });
    });
  });

  describe('404 Routes', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Route not found'
      });
    });
  });
});