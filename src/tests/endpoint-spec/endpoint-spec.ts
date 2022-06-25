import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Testing responses from endpoints', () => {
  it('end point being used but without parameters',async ()=> {
     await request.get('/api/images').expect(400);
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
