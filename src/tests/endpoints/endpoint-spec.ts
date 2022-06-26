import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Testing endpoints /api/images', () => {
  it('gets /api/images being used but without parameters', async () => {
    await request.get('/api/images').expect(404);
  });

  it('responds with 404 if called correctly but image does not exist', async () => {
    await request.get('/api/images?name=flowers&height=100&width=100').expect(404);
  });

  it('responds with 404 if endpoint called with a missing parameter', async () => {
    await request.get('/api/images?name=test&width=40').expect(404);
  });

  it('responds with 200 if endpoint called correctly and image exists, given width and height', async () => {
    await request.get('/api/images?name=fjord&width=520&height=520').expect(200);
  });

});
