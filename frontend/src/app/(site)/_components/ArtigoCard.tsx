'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./ArtigoCard.module.css";
import { sportsItemType } from "@/types/sportsItem";
import { Button } from "@/components/button";
import { useState } from "react";
import { useToast } from "@/components/use-toast";
import { buyItem } from "@/actions/sportsItem";

export default function ArtigoCard({ ...sportItem }: sportsItemType) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    
    const fallbackImage = "https://picsum.photos/300/200?random=" + sportItem?.id;

    async function handlePurchase() {
        setLoading(true);
        
        try {
            const result = await buyItem(sportItem.id);

            if (result.success) {
                toast({
                    title: "Sucesso!",
                    description: `${sportItem.name} comprado com sucesso.`,
                    
                });
                window.location.reload(); 
            } else {
                toast({
                    title: "Erro na compra",
                    description: result.error || "Não foi possível processar o pedido.",
                    variant: "destructive",
                });
            }
        } catch (err) {
            toast({
                title: "Erro crítico",
                description: "Falha na comunicação com o servidor.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.ArtigoCard}>
            <Link href={`/artigo/${sportItem?.id}`} className={styles.artigoLink}>
                <Image 
                    className={styles.artigoImage} 
                    src={sportItem?.image || fallbackImage} 
                    alt={sportItem?.name} 
                    width={300} 
                    height={200} 
                />
            </Link>
            
            <h1 className={styles.artigoName}>{sportItem?.name}</h1>
            
            <p className={styles.artigoCategory}>
                Categoria: {sportItem?.category?.name || "Sem categoria"}
            </p>
            
            <p className={styles.artigoBranch}>Marca: {sportItem?.brand}</p>
            <p className={styles.artigoYear}>Ano: {sportItem?.year}</p>
            <p className={styles.artigoPrice}>R${sportItem?.price}</p>
            <p className={styles.artigoStock}>Estoque: {sportItem?.amount}</p>
            
            {sportItem.amount > 0 ? (
                <Button 
                    onClick={handlePurchase} 
                    pending={loading} 
                    variant="default"
                    className={styles.artigoButton}
                >
                    Comprar
                </Button>
            ) : (
                <Button className={styles.artigoButton} disabled>
                    Esgotado
                </Button>
            )}
        </div>
    );
}