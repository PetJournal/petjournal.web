import SpeciesCard from '@/components/SpeciesCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Fredoka } from '@next/font/google';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
});

function Species() {
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsContinueDisabled(selectedSpecies === '');
  }, [selectedSpecies]);

  const SpeciesList = [
    'Cachorro',
    'Pássaro',
    'Gato',
    'Peixe',
    'Réptil',
    'Roedor',
  ];

  return (
    <div className={`${fredoka.variable} font-sans`}>
      <header className="flex items-center justify-center h-14 font-normal text-base shadow-[0_2px_4px_0_rgba(0,0,0,0.06)] mb-9">
        <h1 className="text-primary-400">Cadastro Pet</h1>
      </header>
      <main className="max-w-sm mx-auto flex flex-col items-center">
        <h2 className="text-primary-400 text-center text-[22px] leading-6 px-2">
          Olá <span className="text-primary-300">Fulano</span>, gostaríamos de
          saber qual a espécie do seu Pet:
        </h2>

        <div className="grid grid-cols-3 gap-4 mt-20">
          {SpeciesList.map((species) => (
            <SpeciesCard
              key={species}
              species={species}
              selectedSpecies={selectedSpecies}
              setSelectedSpecies={setSelectedSpecies}
              setIsInputActive={setIsInputActive}
            />
          ))}
        </div>

        <button
          className="bg-link-400 w-[200px] py-2 rounded-3xl mt-5 text-gray-100 hover:bg-link-300 focus:bg-link-300 transition-colors"
          onClick={() => {
            setIsInputActive(!isInputActive);
            setSelectedSpecies('');
          }}
        >
          Outros...
        </button>

        {isInputActive && (
          <div className="mt-10">
            <label
              htmlFor="species"
              className="self-start ml-3 text-primary-400"
            >
              Insira a espécie:
            </label>
            <input
              type="text"
              name="species"
              placeholder="Digite aqui..."
              className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full outline-none"
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
            />
          </div>
        )}

        <div className="absolute bottom-8 flex gap-4">
          <Link
            href="/pet-register"
            className="text-primary-400 border-2 border-primary-400 rounded-3xl w-40 py-2 text-center"
          >
            Voltar
          </Link>
          <button
            disabled={isContinueDisabled}
            className="bg-primary-400 text-gray-100 rounded-3xl w-40 py-2 disabled:text-gray-300 disabled:border-2 disabled:border-gray-300 disabled:bg-transparent"
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}

export default Species;
