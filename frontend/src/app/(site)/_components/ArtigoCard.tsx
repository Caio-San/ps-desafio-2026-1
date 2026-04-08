import Image from "next/image";
import Link from "next/link";
import styles from "./ArtigoCard.module.css";
import { sportsItemType } from "@/types/sportsItem";

export default function ArtigoCard({ ...sportItem }: sportsItemType) {
    const fallbackImage = "https://picsum.photos/300/200?random=" + sportItem?.id 

    console.log("ArtigoCard renderizado com item:", sportItem);

    return (
        <div className={styles.ArtigoCard}>
            <Link href={`/artigo/${sportItem?.id}`} className={styles.artigoLink}>
                <Image className={styles.artigoImage} src={sportItem?.image || fallbackImage} alt={sportItem?.name} width={300} height={200} />
            </Link>
            <h1 className={styles.artigoName}>{sportItem?.name}</h1>
            <p className={styles.artigoCategory}>
                Categoria: {sportItem?.category?.name || "Sem categoria"}
            </p>
            <p className={styles.artigoBranch}>Marca: {sportItem?.brand}</p>
            <p className={styles.artigoYear}>Ano: {sportItem?.year}</p>
            <p className={styles.artigoPrice}>R${sportItem?.price}</p>
            <p className={styles.artigoStock}>Estoque: {sportItem?.amount}</p>
            {sportItem?.amount > 0 ? (
                <button className={styles.artigoButton}>Comprar</button>
            ) : (
                <button className={styles.artigoButton} disabled>Esgotado</button>
            )}
        </div>
    )
}