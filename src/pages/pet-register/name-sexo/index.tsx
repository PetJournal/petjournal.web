import Link from "next/link";
import Female from "./assets/female";
import HouseComponent from "./assets/house";
import Icon from "./assets/logo";
import Male from "./assets/Men";

function  NameSexo() {
    return (
        <div className="flex h-screen flex-col font-quicksand text-primary/purple bg-gray-100">
            <header className="flex w-full  relative justify-center border-b ">
            <Link href="/" className="mt-[0.5rem] mb-[0.5rem]">
               <Icon />
            </Link>
            </header>
            <main className="p-4 mt-2">
                <span className="flex gap-1">
                    <HouseComponent />
                    Cadastro pet
                </span>
                <div className="text-xl font-bold w-[327px] mt-[1rem]">
                    <h2>Uau!</h2>
                    <p className="mt-[0.5rem]">Ficamos muito felizes em receber mais um gato em nossa comunidade!</p>
                </div>
                <div className="flex flex-col gap-2 text-gray/400 mt-8">
                    <h2 className="text-center font-semibold text-base">Qual o nome do seu companheiro?</h2>
                    <label className="text-xs font-medium">Nome:</label>
                    <input type="text" placeholder="Digite aqui" className="border border-dashed boder-gray/300 w-[327px] px-1 py-2 rounded-lg" />
                </div>

                <div className="text-gray/400 mt-6">
                    <h2 className="text-center font-semibold text-base">Qual o sexo do seu Pet?</h2>
                    <div className="flex justify-center gap-4 mt-4 ">
                        <div className="border-gray/300 border-dashed gap-1 px-1 py-2 bg-white w-[133px]">
                            <Male />
                            <p className="text-sm font-semibold text-center">Macho</p>
                        </div>
                        <div className="border border-dashed gap-1 px-1 py-2  bg-white w-[133px]">
                            <Female />
                            <p className="text-sm font-semibold text-center">Fêmea</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-1">
                    <button
                        type="button"
                        className="border  border-primary/purple text-gray/400 px-4 py-2 rounded-lg"
                    >
                        Voltar
                    </button>
                    <button
                        type="button"
                        className="bg-primary/purple text-white px-4 py-2 rounded-lg"
                    >
                        Continuar
                    </button>
                </div>
            </main>
        </div>
    )
}

export default NameSexo;