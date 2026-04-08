'use client';

import Link from 'next/link';
import styles from './Categorias.module.css';
import { categories } from '@/types/categories';
import { useState, useEffect } from 'react';
import { api } from '@/services/api'; 

interface CategoriasProps {
    onSelectCategory: (id: string | null) => void;
    activeId: string | null;
}

export default function Categorias({ onSelectCategory, activeId }: CategoriasProps) {
    const [categorias, setCategorias] = useState<categories[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCategorias() {
            const { response, error } = await api<categories[]>('GET', '/category');
            if (response) setCategorias(response);
            setLoading(false);
        }
        getCategorias();
    }, []);


    return (
        <section id="categorias" className={styles.categorias}>
            <div className={styles.container}>
                <h2 className={styles.title}>Categorias</h2>
                <div className={styles.grid}>
                    <button 
                        onClick={() => onSelectCategory(null)}
                        className={`${styles.categoria} ${!activeId ? styles.active : ''}`}
                    >
                        Todos
                    </button>

                    {categorias.map((categoria) => (
                        <button 
                            key={categoria.id} 
                            onClick={() => onSelectCategory(categoria.id)}
                            className={`${styles.categoria} ${activeId === categoria.id ? styles.active : ''}`}
                        >
                            {categoria.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}