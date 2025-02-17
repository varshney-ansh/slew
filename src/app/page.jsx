import WindowSystem from '@/components/windowSystem/windowSystem';
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';

const HomePage = async () => {
    return (
        <div className={styles.container}>
            <div className={styles.MainContainer}>
                <div className={styles.searchContainer}>
                    <div className={styles.brandLogo}>
                        <Image src="/slew_purple_logo.png" alt="brand_logo" height={62} width={146} priority={true} />
                    </div>
                    <div className={styles.searchbar}>
                        <form action="/search" method="GET">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width='24' height='24' viewBox="0 0 512 512">
                                    <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448" />
                                </svg>
                            </span>
                            <input name="q" type="text" autoComplete="off" aria-label="Search with Searchhie" />
                        </form>
                    </div>
                    <div className={styles.trendKeys}>
                        <li>
                            <Link href="#">
                                <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M22.99 8.13721L22.1703 3.47933C22.0203 2.60972 21.2606 2 20.4108 2C20.3109 2 20.2009 2 20.1009 2.02999L2.47655 5.13857C1.50686 5.3085 .857064 6.23807 1.02701 7.20763L1.64681 10.736V22.1808C1.64681 23.1804 2.45656 24 3.46623 24H20.9806C21.9803 24 22.8001 23.1904 22.8001 22.1808V10.696H8.46464L23 8.13721H22.99ZM15.1325 7.4975L12.6333 7.9373L13.8529 5.16856L16.3521 4.72876L15.1325 7.4975ZM10.2641 8.35711L7.72487 8.80691L8.94449 6.03816L11.4837 5.58837L10.2641 8.35711ZM20.2309 4.04907L20.6707 6.52794L17.4918 7.08769L18.7114 4.31895L20.2309 4.04907ZM6.57524 6.45797L5.35563 9.22671L3.46623 9.55657L3.02637 7.07769L6.57524 6.44798V6.45797ZM20.7907 22.0109H3.64618V12.7151H20.7907V22.0109Z' />
                                </svg>
                                <span>Movies</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M21.998 3c.553 0 1 .56 1 1.25V16c0 2.756-1.794 5-3.999 5H4c-1.656 0-3-1.679-3-3.75V8.27c0-.692.448-1.25 1-1.25h3.003V4.25c0-.69.446-1.25.999-1.25h15.996ZM5.003 9h-2v9.017c0 .736.447.989 1 .989.552 0 1-.253 1-.989V9ZM21 5H7.004l-.001 14H19c1.102 0 1.999-1.272 1.999-2.833L21 5Zm-3.002 8a1 1 0 1 1 0 2H10a1 1 0 1 1 0-2h7.998Zm0-4a1 1 0 1 1 0 2H14a1 1 0 1 1 0-2h3.998Zm-7 0a1 1 0 1 1 0 2H10a1 1 0 1 1 0-2h.998Z' />
                                </svg>
                                <span>News</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M6.964 3c.436 0 1 .448 1 1C7.964 5.419 11 8.12 12 8.124c.785-.004.926-.013 1.075-.013 2.641.122 5.155 1.056 7.133 2.683a10.49 10.49 0 0 1 2.677 3.276c.154.298.154.652 0 .949a10.492 10.492 0 0 1-2.675 3.275C18.091 20.039 15.35 21 12.492 21c-2.856 0-5.596-.961-7.716-2.706a10.506 10.506 0 0 1-2.675-3.275 1.032 1.032 0 0 1 0-.949 12.371 12.371 0 0 1 2.506-3.036C2.666 9.989 1 7.693 1 5.611a1 1 0 0 1 2 0c0 1.889 2.125 4 3.4 4.189 1.004-.586 1.806-.913 2.676-1.159C7.375 7.409 5.964 5.612 5.964 4c0-.552.536-1 1-1Zm5.528 7.146c-2.375 0-4.65.795-6.407 2.239a8.577 8.577 0 0 0-1.888 2.158 8.565 8.565 0 0 0 1.889 2.159c1.752 1.443 4.027 2.237 6.406 2.237 2.381 0 4.656-.795 6.407-2.237a8.563 8.563 0 0 0 1.889-2.159 8.563 8.563 0 0 0-1.889-2.159c-1.754-1.443-4.029-2.238-6.407-2.238ZM12.5 12a2.499 2.499 0 1 1 0 5 2.5 2.5 0 1 1 0-5Z' />
                                </svg>
                                <span>Horoscope</span>
                            </Link>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;