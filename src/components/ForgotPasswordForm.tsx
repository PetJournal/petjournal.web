import { useEffect, useState } from 'react';
import axios from '@/pages/api/axios';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import ToastNotification, { showErrorToast, showSuccessToast } from '@/utils/toast-notification';


type FormData = {
  email: string
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

  const [loading, setLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(!isValid)
  const [submissionMsg, setSubmissionMsg] = useState('')

  useEffect(() => {
    setIsButtonDisabled(!isValid)
    setSubmissionMsg('')
  }, [isValid])

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    setIsButtonDisabled(true)
  
    try {
      const response = await axios.post('/forget-password', data)
      const res = response ? response.data.message : 'Erro ao processar a solicitação.'
  
      if (res === "Email sent successfully") {
        showSuccessToast("E-mail enviado com sucesso. Redirecionando...")

        setTimeout(() => {
          push({
            pathname: '/recovery-code',
            query: {email: data.email}
          })
        }, 3000)

      } else {
        showErrorToast(res)
      }
    } catch (err: any) {
      const error = err.response ? err.response.data.error : 'Erro ao processar a solicitação.'
  
      if (error === "Not found: email") {
        showErrorToast("E-mail não encontrado.")
      } else {
        showErrorToast("Erro ao processar a solicitação.")
      }
    }
  
    setLoading(false)
    setIsButtonDisabled(false)
  }
  
  const { push } = useRouter()

  const handleRedirectToLogin = () => {
    push('/login')
  }

  return (
    <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <label className='flex flex-col gap-2'>
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
          type='submit'
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
          type='reset'
          onClick={handleRedirectToLogin}
          className={`w-[154px] h-[48px] flex self-center font-medium 
        items-center justify-center rounded-[16px] 'bg-transparent border-2 border-custom-purple text-custom-purple`}
        >
          Cancelar
        </button>
      </div>
      <ToastNotification />
    </form>
  );
}

export default ForgotPasswordForm
