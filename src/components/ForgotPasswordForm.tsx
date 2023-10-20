// Hooks
import { FormEvent, useState } from 'react';
import useInput from '@/hooks/useInput';
import axios from '@/pages/api/axios';
import { ZodError, z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
  email: string;
}

const emailSchema = z.object({
  email: z.string().email({ message: 'Por favor, digite um e-mail válido.' })
})

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  });

  const [loading, setLoading] = useState(false);
  const [submissionMsg, setSubmissionMsg] = useState('');

  const emailProps = useInput({ validate: validateEmail });
  const isButtonDisabled = !isValid;

  function validateEmail(value: string): string | undefined {
    try {
      emailSchema.parse(value)
      return undefined
    } catch (err) {
      if (err instanceof ZodError) {
        return err.errors[0].message;
      }
      return 'Erro de validação de e-mail';
    }
  }

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    axios.post('/forget-password', {
      email: emailProps.value,
    })
      .then((response) => {
        setLoading(false);
        if (response.data.error) {
          setSubmissionMsg(response.data.error);
        } else {
          setSubmissionMsg(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err)
        const error = err.response ? err.response.data.error : 'Erro ao processar a solicitação.';
        setLoading(false);
        setSubmissionMsg(error);
      });
  }

  return (
    <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        <span className="mb-1 block text-custom-purple font-medium">Qual o seu e-mail de cadastro?</span>
        <div>
          <div className="flex h-[47px] items-center border border-[#7A7A7A] rounded-[5px] py-2 px-2">
            <input
              type="text"
              className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
              placeholder="Digite seu e-mail"
              {...register('email', { required: 'Este campo é obrigatório.' })}
            />
          </div>
          {
            errors.email &&
            <span className="text-center text-xs text-red-600">{errors.email.message}</span>
          }
          {!errors.email && submissionMsg &&
            <span className="text-center text-xs text-red-600">{submissionMsg}</span>
          }
        </div>
      </label>

      <div className='flex flex-col gap-2'>
      <button
        className={`w-[154px] h-[48px] flex self-center font-medium 
        items-center justify-center rounded-[16px] mt-16 ${isButtonDisabled
            ? 'bg-transparent border-2 border-[#B2B2B2] text-[#B2B2B2]'
            : 'bg-custom-purple text-white'
          }`}
        disabled={isButtonDisabled}
      > 
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
      <button
        className={`w-[154px] h-[48px] flex self-center font-medium 
        items-center justify-center rounded-[16px] 'bg-transparent border-2 border-custom-purple text-custom-purple`}
      > 
        Cancelar
      </button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
