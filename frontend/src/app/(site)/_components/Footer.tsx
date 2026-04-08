import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer id="rodape" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3>Sobre Nós</h3>
                    <p>Somos uma loja especializada em artigos esportivos de alta qualidade. Oferecemos os melhores produtos para atletas de todos os níveis.</p>
                </div>
                <div className={styles.section}>
                    <h3>Contato</h3>
                    <p>Email: caio.s.pereira@edu.ufes.br</p>
                    <p>Telefone: (11) 9999-9999</p>
                    <p>Endereço: Rua Monsenhor Schimidt, 735, São Mateus</p>
                </div>
                <div className={styles.section}>
                    <h3>Redes Sociais</h3>
                    <p>Facebook | Instagram | Twitter</p>
                </div>
            </div>
        </footer>
    );
}