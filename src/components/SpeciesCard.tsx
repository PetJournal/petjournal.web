type SpeciesCardProps = {
  species: string;
  selectedSpecies: string;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<string>>;
  setIsInputActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function SpeciesCard({
  species,
  selectedSpecies,
  setSelectedSpecies,
  setIsInputActive,
}: SpeciesCardProps) {
  return (
    <div
      className={`flex justify-center items-center flex-col cursor-pointer w-[100px] h-[100px] border-2 ${
        selectedSpecies === species
          ? 'border-primary-400 text-primary-400'
          : 'border-gray-300 text-gray-300'
      } rounded-lg`}
      onClick={() => {
        setIsInputActive(false);
        setSelectedSpecies(species);
      }}
    >
      <img
        src={`/images/${species
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')}.svg`}
        alt={species}
      />
      <p className="font-semibold text-sm">{species}</p>
    </div>
  );
}

export default SpeciesCard;
