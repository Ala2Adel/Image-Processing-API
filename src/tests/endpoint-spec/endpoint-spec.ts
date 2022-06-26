import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Testing endpoints', () => {
  it('gets /api/images being used but without parameters', async () => {
    await request.get('/api/images').expect(400);
  });

  it('responds with 404 if called correctly but image does not exist', async () => {
    await request.get('/api/images?filename=test&height=100&width=100').expect(404);
  });

  it('responds with 400 if called with a missing parameter', async () => {
    await request.get('/api/images?filename=test&height=100').expect(400);
  });

  //   describe('/api/images', (): void => {
  //     it('gets /api/images?filename=fjord ', async () => {
  //       const response: supertest.Response = await request.get(
  //         '/api/images?filename=fjord'
  //       );

  //       expect(response.status).toBe(400);
  //     });
  //   });
});
