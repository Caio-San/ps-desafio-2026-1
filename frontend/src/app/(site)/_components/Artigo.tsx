'use client'
import styles from './Artigo.module.css'
import { sportsItemType } from '@/types/sportsItem';
import ArtigoCard from './ArtigoCard';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface ArtigoProps {
    categoryId: string | null;
}

export default function Artigo({ categoryId }: ArtigoProps) {
    const [allSportItems, setAllSportItems] = useState<sportsItemType[]>([]); 
    const [filteredItems, setFilteredItems] = useState<sportsItemType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSportItems() {
            const { response, error } = await api('GET', '/artigo');
            if (response) {
                const data = response as sportsItemType[];
                setAllSportItems(data);
                setFilteredItems(data); 
            } else {
                console.error(error?.message);
            }
            setLoading(false);
        }
        getSportItems();
    }, []);

    
    useEffect(() => {
        if (!categoryId) {
            setFilteredItems(allSportItems); 
        } else {
            const filtered = allSportItems.filter(item => {
                const idDaCategoriaNoItem = item.category?.id || (item as any).categoryId;
                return idDaCategoriaNoItem === categoryId;
            });
            setFilteredItems(filtered);
        }
    }, [categoryId, allSportItems]);

    if (loading) return <p className={styles.loading}>Carregando artigos...</p>;

    return (
        <section className={styles.Artigo} id="artigos">
            <div className={styles.container}>
                <h2 className={styles.title}>
                    {categoryId ? "Artigos Filtrados" : "Nossos Artigos"}
                </h2>
                <div className={styles.artigoList}>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item: sportsItemType) => (
                            <ArtigoCard key={item.id} {...item} />
                        ))
                    ) : (
                        <p className={styles.empty}>Nenhum artigo encontrado para esta categoria.</p>
                    )}
                </div>
            </div>
        </section>
    );
}