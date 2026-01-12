const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../index');

const USERS_FILE = path.join(__dirname, '..', 'users.json');

describe('API de usuarios', () => {
  const testUser = {
    id: 'test123',
    name: 'Test User',
    email: 'test@example.com'
  };

  afterAll(() => {
    if (!fs.existsSync(USERS_FILE)) return;

    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const filtered = users.filter(u => u.id !== testUser.id);

    fs.writeFileSync(
      USERS_FILE,
      JSON.stringify(filtered, null, 2),
      'utf8'
    );
  });

  it('Debe responder el endpoint raíz', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Servidor en ejecucion/i);
  });

  it('Debe crear un nuevo usuario', async () => {
    const res = await request(app).post('/users').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toMatchObject(testUser);
  });

  it('Debe obtener todos los usuarios', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Debe buscar el usuario creado', async () => {
    const res = await request(app).get(`/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toMatchObject(testUser);
  });
});
