function CardAnimal() {

    const especies = [
        {
            name: 'Cachorro',
            photo: '/images/cadastro-pet/cachorro.svg',
        },
        {
            name: 'Pássaro',
            photo: '/images/cadastro-pet/passaro.svg',
        },
        {
            name: 'Gato',
            photo: '/images/cadastro-pet/gato.svg',
        },
        {
            name: 'Peixe',
            photo: '/images/cadastro-pet/peixe.svg',
        },
        {
            name: 'Reptil',
            photo: '/images/cadastro-pet/reptil.svg',
        },
        {
            name: 'Roedor',
            photo: '/images/cadastro-pet/roedor.svg',
        }
    ]



    return (
        <section className=' grid grid-cols-3 mt-6 w-[340px] g-2 items-center'>
            {
                especies.map((item) => {
                    return (
                        <ul className="">
                            <li className="w-[100px] h-[100px] items-center border-2 rounded-lg mt-2 border-gray/300">
                                <div className='flex  flex-col items-center p-2'>
                                    <img src={item.photo} alt="" className="w-[60px] h-[60px]"/>
                                    <h3>{item.name}</h3>
                                </div>
                                
                            </li>   
                        </ul>
                    )
                })
            }
        </section>
    )

}

export default CardAnimal;