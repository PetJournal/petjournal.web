import ForgotPasswordForm from '@/components/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center p=4">
      <div className="w-full max-w-sm m-auto">
        <h1 className="text-center text-xl">Esqueceu a senha?</h1>
        <p className="text-center mt-6">Redefina a senha em duas etapas</p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
