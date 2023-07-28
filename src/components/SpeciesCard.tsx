type SpeciesCardProps = {
  species: string;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<string>>;
  setIsInputActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function SpeciesCard({
  species,
  setSelectedSpecies,
  setIsInputActive,
}: SpeciesCardProps) {
  return (
    <div
      className="flex justify-center items-center flex-col w-[100px] h-[100px] border-2 border-[#B2B2B2] rounded-lg"
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
      <p>{species}</p>
    </div>
  );
}

export default SpeciesCard;
