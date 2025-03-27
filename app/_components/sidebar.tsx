'use client';
import Link from 'next/link';
import { Button } from "./ui/button";
import {LayoutGridIcon, PackageIcon, ShoppingBasketIcon} from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    //Esse pathName pega sempre a tela atual.
    const pathName = usePathname();
    return (
       <div className="w-64 bg-white p">
            {/*Imagem */}
            <div className="px-8 py-6">
                <h1 className="font-bold text-2xl">STOCKLY</h1>
            </div>
            {/*Botões */}
            <div className="flex flex-col gap-2 p-2">
                <Button variant={pathName === '/' ? 'secondary' : 'ghost'} className="justify-start gap-1" asChild>
                    <Link href="/">
                        <LayoutGridIcon size={20}/>
                        Dashbord
                    </Link>
                  
                </Button>
                <Button variant={pathName === '/products' ? 'secondary' : 'ghost'} className="justify-start gap-1" asChild>
                    <Link href="/products">
                        <PackageIcon size={20}/>
                        Produtos
                    </Link>
                </Button>
                <Button variant={pathName === '/sales' ? 'secondary' : 'ghost'} className="justify-start gap-1" asChild>
                    <Link href="/sales">
                        <ShoppingBasketIcon size={20}/>
                        Vendas
                    </Link>
                </Button>
            </div>
       </div>
    )
}

export default Sidebar;