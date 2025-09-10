"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{include: {restaurant: {select: {
        name: true,
        avatarImageUrl: true,
    }} }}>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if(prev === 1){
                return 1;
            }
            return prev - 1;
        });
    }
    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }
    return ( 
        <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] flex-auto flex flex-col overflow-hidden">
            <div className="flex-auto overflow-hidden">
                {/* Restaurant */}
            <div className="flex items-center gap-1.5">
                <Image 
                src={product.restaurant.avatarImageUrl} 
                alt={product.restaurant.name} 
                width={16} 
                height={16} 
                className="rounded-full" 
                />
                <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
            </div>

            <h2 className="text-xl font-semibold">{product.name}</h2>
            
            <div className="flex items-center justify-between mt-3">
                <h3 className="text-xl font-semibold">
                    {formatCurrency(product.price)}
                </h3>
                <div className="flex items-center gap-3 text-center">
                    <Button 
                        variant="outline" 
                        className="h-8 w-8 rounded-xl" 
                        onClick={handleDecreaseQuantity}>
                    <ChevronLeftIcon />
                    </Button>
                    <p className="w-4">{quantity}</p>
                    <Button 
                        variant="destructive" 
                        className="h-8 w-8 rounded-xl" 
                        onClick={handleIncreaseQuantity}>
                    <ChevronRightIcon />
                    </Button>
                 </div>
                
            </div>

            <ScrollArea className="h-full">
            <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
            </div>
                <ul className="list-disc px-5 text-sm text-muted-foreground">
                    {product.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            </ScrollArea>
            </div>

            <Button className="mt-6 w-full rounded-full uppercase">Adicionar à sacola</Button>
        </div>
     );
}
 
export default ProductDetails;