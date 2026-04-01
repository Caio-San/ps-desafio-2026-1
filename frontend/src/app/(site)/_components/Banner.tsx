import Image from 'next/image'
import styles from './Banner.module.css'

export default function Banner() {
    return(
        <div className={styles.banner}>
            <Image className={styles.bannerImage} src="/assets/images/banner.jpg" alt="Banner" width={1200} height={400} />
        </div>
    )
}