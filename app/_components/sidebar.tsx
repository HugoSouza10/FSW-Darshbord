const Sidebar = () => {
    return (
       <div className="w-64 bg-white p">
            {/*Imagem */}
            <div className="px-8 py-6">
                <h1 className="font-bold text-2xl">STOCKLY</h1>
            </div>
            {/*Botões */}
            <div className="flex flex-col gap-2 p-2">
                <button className="px-6 py-3">Dashbord</button>
                <button className="px-6 py-3">Produtos</button>
                <button className="px-6 py-3">Vendas</button>
            </div>
       </div>
    )
}

export default Sidebar;