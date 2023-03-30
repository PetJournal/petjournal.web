"use client";
import { useState } from 'react';


export default function screenRegister() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleBirthDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">Nome</label>
    <input type="text" id="name" value={name} onChange={handleName}/>

    <label htmlFor="lastName">Sobrenome</label>
    <input type="text" id="lastName" value={lastName} onChange={handleLastName}/>

    <label htmlFor="email">E-mail</label>
    <input type="email" id="email" value={email} onChange={handleEmail}/>

    <label htmlFor="birthDate">Data de nascimento:</label>
    <input type="date" id="birth-date" value={birthDate} onChange={handleBirthDate}/>

    <label htmlFor="password">Senha:</label>
    <input type="password" id="password" value={password} onChange={handlePassword}/>

    <label htmlFor="confirmPassword">Confirmar senha:</label>
    <input type="passwowrd" id="confirm-password" value={passwordConfirmation} onChange={handlePasswordConfirmation} />
    </form>
    </>
  )
}
