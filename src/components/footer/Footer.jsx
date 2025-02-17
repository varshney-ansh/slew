import Link from 'next/link';
import styles from './footer.module.css'
import Image from 'next/image';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.brandLogo}>
                    <Image src="/slew_purple_logo.png" alt="brand_logo" height={24} width={57} priority={true} />
                </div>
                <div className={styles.otherLinks}>
                    <Link href="#">Settings</Link>
                    <Link href="#">Help</Link>
                    <Link href="#">Terms</Link>
                    <Link href="#">Privacy</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;