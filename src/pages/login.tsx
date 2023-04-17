// Components
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

// Mock API
import buildServer from '@/server/mirage';

buildServer();

function LoginPage() {
  return (
    <div>
      <LoginForm />
      <p>
        Não tem uma conta? <Link href="/register">Inscreva-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
