export default function screenRegister() {
  return (
    <>
    <label htmlFor="name">Nome</label>
    <input type="text" id="name" value='ok' />

    <label htmlFor="email">E-mail</label>
    <input type="email" id="email" value='email'/>

    <label htmlFor="birthDate">Data de nascimento:</label>
    <input type="date" id="birth-date" value="data" />

    <label htmlFor="password">Senha:</label>
    <input type="password" id="password" value="pass" />

    <label htmlFor="confirmPassword">Confirmar senha:</label>
    <input type="passwowrd" id="confirm-password" value="confirm" />
    </>
  )
}
