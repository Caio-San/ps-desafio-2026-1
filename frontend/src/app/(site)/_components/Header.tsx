import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.container}>

                <Image src="/assets/images/logo.webp" alt="Logo" width={100} height={100} />   
                < div className={styles.nav}>
                    <Link href="" className={styles.link}>Artigos</Link>
                    <Link href="" className={styles.headerlink}>Categorias</Link>
                    <Link href="" className={styles.headerlink}>Sobre</Link>
                    <Link href="" className={styles.headerlink}>Contato</Link>

                </div>
            </div>
        </header>
    )
}