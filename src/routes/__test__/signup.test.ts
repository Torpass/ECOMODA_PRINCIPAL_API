import request from 'supertest';
import { app } from '../../app';

it('should return a 422 error if the email is not valid ', async () => {
  await request(app)
  .post('/api/signup/signupUser')
  .send({
    email: "test.com",
    password: "password"
  })
  .expect(422);
});

// it('should return a 405 error for non-post request ', async () => {
//   await request(app).post('/api/signup/signupUser').expect(405);
// });
