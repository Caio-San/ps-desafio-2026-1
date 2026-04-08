'use client'; 
import { useState } from 'react';
import Banner from './_components/Banner'
import Categorias from './_components/Categorias'
import Artigo from './_components/Artigo'
import { Footer } from './_components/Footer'


export default function Home() {

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <main>
      <Banner />
      <Categorias 
        onSelectCategory={setSelectedCategoryId} 
        activeId={selectedCategoryId} 
      />
      <Artigo categoryId={selectedCategoryId} />
      <Footer />
    </main>
  );
}