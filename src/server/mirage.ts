import { createServer, Model } from 'miragejs';

// Types
import { UserModelType } from '@/types/mirageTypes';

const buildServer = () => {
  return createServer({
    models: {
      user: Model.extend<Partial<UserModelType>>({}),
    },

    seeds(server) {
      server.create('user', {
        email: 'user@example.com',
        password: 'password',
      } as object);
    },

    routes() {
      this.namespace = 'api';
      this.post('/login', (schema, request) => {
        const { email, password } = JSON.parse(
          request.requestBody,
        ) as UserModelType;
        const user = schema.findBy('user', { email, password } as object);

        if (user) {
          return { token: 'fake_token' };
        } else {
          return { error: 'Email ou senha incorretos.' };
        }
      });
    },
  });
};

export default buildServer;
