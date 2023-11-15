import Image from 'next/image';
import Link from 'next/link';

function PetSelect() {
  return (
    <div className="flex h-screen flex-col p-4">
      <header className="flex w-full relative justify-center mb-9">
        <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={12}
            viewBox="0 0 16 12"
            fill="none"
          >
            <path
              d="M1 6H15"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 1L1 6"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 11L1 6"
              stroke="black"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="">Cadastro Pet</h1>
      </header>
      <div className="flex flex-col justify-between text-center h-full">
        <div>
          <h2>Olá Clevinho, gostaríamos de saber qual a espécie do seu Pet:</h2>
          <p className="mt-3">
            Sabemos o quanto o seu pet é especial, e estamos muito animados em
            recebê-los. Venha se juntar a nossa comunidade de amantes de pets,
            para melhor aproveitar a nossa plataforma.
          </p>
        </div>
        <Image
          src="/images/pets-illustration.svg"
          alt="ilustração de animais"
          width={500}
          height={500}
          className="w-[82%] block mx-auto"
        ></Image>
        <Link
          href="/pet-register/species"
          className="block mx-auto p-3 w-52 rounded-full text-[#F2F2F2] bg-[#9A0963]"
        >
          Continuar
        </Link>
      </div>
    </div>
  );
}

export default PetSelect ;
