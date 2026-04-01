
import styles from './Artigo.module.css'

export default function Artigo() {
    return(
        <section className={styles.artigos} id ="artigos">
            <div className={styles.container}>
                <h2 className={styles.title}>Artigos</h2>
                <p className={styles.description}>Confira nossos artigos mais recentes sobre tecnologia, inovação e tendências do mercado.</p>
            </div>
        </section>
    )
}