'use client'
import { useState } from 'react';
import styles from './searchhead.module.css'
import Image from 'next/image';
import Link from 'next/link';

const SearchHead = ({ q, type }) => {

    const [query, setQuery] = useState(q);

    return (
        <div className={styles.header}>
            <div className={styles.barcontainer}>
                <div className={styles.leftside}>
                    <div className={styles.brandlogo}>
                        <Image src={'/slew_purple_logo.png'} alt="brand_logo" height={38} width={90} priority={true} />
                    </div>
                    <div className={styles.searchbar}>
                        <form action="/search" method="GET" id="search">
                            <input name="q" value={query} onChange={(e) => setQuery(e.target.value)} type="text" autoComplete="off" aria-label="Search with Searchhie" />
                            <div className={styles.extraicons}>
                                <span style={query == '' ? { display: 'none' } : { display: 'flex' }} onClick={(e) => setQuery("")}>
                                    <svg focusable="false" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                </span>
                                <span className={styles.line}></span>
                                <span onClick={(e) => document.getElementById('search').submit()}>
                                    <svg focusable="false" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.slewLabs}>
                        <svg focusable="false" height="24px" viewBox="0 -960 960 960" width="24px"> <path d="M209-120q-42 0-70.5-28.5T110-217q0-14 3-25.5t9-21.5l228-341q10-14 15-31t5-34v-110h-20q-13 0-21.5-8.5T320-810q0-13 8.5-21.5T350-840h260q13 0 21.5 8.5T640-810q0 13-8.5 21.5T610-780h-20v110q0 17 5 34t15 31l227 341q6 9 9.5 20.5T850-217q0 41-28 69t-69 28H209Zm221-660v110q0 26-7.5 50.5T401-573L276-385q-6 8-8.5 16t-2.5 16q0 23 17 39.5t42 16.5q28 0 56-12t80-47q69-45 103.5-62.5T633-443q4-1 5.5-4.5t-.5-7.5l-78-117q-15-21-22.5-46t-7.5-52v-110H430Z"></path> </svg>
                    </div>
                    <div className={styles.allTools}>
                        <svg focusable="false" height="24px" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path><image src="https://ssl.gstatic.com/gb/images/bar/al-icon.png" alt="" height="24" width="24" style={{ border: 'none', display: 'none' }}></image></svg>
                    </div>
                </div>
            </div>
            <div className={styles.tabs}>
                <div className={type == null || type == '' ? `${styles.tab} ${styles.active}` : `${styles.tab}`}>
                    <Link href={`/search?q=${q}`}>All</Link>
                </div>
                <div className={type == 'news' ? `${styles.tab} ${styles.active}` : `${styles.tab}`}>
                    <Link href={`/search?q=${q}&type=news`}>News</Link>
                </div>
                <div className={type == 'images' ? `${styles.tab} ${styles.active}` : `${styles.tab}`}>
                    <Link href={`/search?q=${q}&type=images`}>Images</Link>
                </div>
                <div className={type == 'web' ? `${styles.tab} ${styles.active}` : `${styles.tab}`}>
                    <Link href={`/search?q=${q}&type=web`}>Web</Link>
                </div>
                <div className={type == 'videos' ? `${styles.tab} ${styles.active}` : `${styles.tab}`}>
                    <Link href={`/search?q=${q}&type=videos`}>Videos</Link>
                </div>
            </div>
        </div>
    )
}

export default SearchHead;