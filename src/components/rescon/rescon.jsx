'use client'
import Link from "next/link";
import Image from "next/image";
import styles from './rescon.module.css';
import parse from 'html-react-parser';

const ResContainer = ({res}) => {

    const defFav = `data:image/svg+xml,%3Csvg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'%3E%3C/path%3E%3C/svg%3E`;
    return (
        <div className={styles.rescontainer}>
           
            <div className={styles.topdiv}>
                <div className={styles.favprev}>
                    <Image src={res.favUrl ? res.favUrl : defFav} width={18} height={18} alt="favPrev" />
                </div>
                <div className={styles.infoabout}>
                    <div className={styles.sitename}>
                        <span>{res.siteName ? parse(res.siteName) : (<span>No information is available for this page.</span>)}</span>
                    </div>
                    <div className={styles.cite}>
                        <cite role="text">{res.cite ? parse(res.cite) : (<span>No information is available for this page.</span>)}</cite>
                        <span className={styles.dots}>
                            <svg height="18" width="18" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.bottomdiv}>
                <div className={styles.metaTitle}>
                    <Link  target="_blank" href={res.targetUrl}>{res.title ? parse(res.title) : (<span>No information is available for this page.</span>)}</Link>
                </div>
                <div className={styles.metadesc}>
                    <p>{res.desc ? parse(res.desc) : (<span>No information is available for this page.</span>)}</p>
                </div>
            </div>
        </div>
    )
}

export default ResContainer;