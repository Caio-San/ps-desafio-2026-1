import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.container}>

                <Image className={`${styles.logo} ${styles.logoLarge}`} src="/assets/images/logoTra.png" alt="Logo" width={100} height={100} />   
                < div className={styles.nav}>
                    <Link href="#artigos" className={styles.link}>Artigos</Link>
                    <Link href="#categorias" className={styles.headerlink}>Categorias</Link>
                    <Link href="#rodape" className={styles.headerlink}>Sobre</Link>
                    <Link href="#rodape" className={styles.headerlink}>Contato</Link>

                </div>
            </div>
        </header>
    )
}