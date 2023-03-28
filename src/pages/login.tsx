// Utils
import { createServer, Model } from 'miragejs';

// Components
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

// Types
import { UserModelType } from '@/types/mirageTypes';

createServer({
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

function LoginPage() {
  return (
    <div>
      <LoginForm />
      <p>
        Não tem uma conta? <Link href="/register">Increva-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
