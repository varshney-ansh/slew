'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './box.module.css';
import useDragger from '@/hooks/useDragger';
import { translateHtml } from '@/actions/lib';
import useResize from '@/hooks/useResize';

const DraggableBox = ({ boxId, topbarId, top, left, link, iframeId, width, height, setItems }) => {
    const [winhtml, setHtml] = useState('');
    const [url, setUrl] = useState(link);

    const boxRef = useRef();
    const RightRef = useRef();
    const BottomRef = useRef();

    useDragger(boxId, topbarId);
    useResize(boxRef, BottomRef, RightRef);

    const closeWindow = () => {
        const oldItem = JSON.parse(window.localStorage.getItem('windowsArray'));
        const filteredItem = oldItem.filter((item) => item.id !== topbarId);
        window.localStorage.setItem('windowsArray', JSON.stringify(filteredItem));
        window.localStorage.removeItem(topbarId);
        setItems(filteredItem);
    }

    const launchWindow = () =>{
        const oldItem = JSON.parse(window.localStorage.getItem('windowsArray'));
        const targetIndex = oldItem.findIndex(f => f.id === topbarId);
        window.open(oldItem[targetIndex].link, '_blank').focus();
    }

    const OnLoadIframe = () => {
        const iframe = document.getElementById(iframeId);
        const anchortags = iframe.contentDocument.querySelectorAll('a');
        anchortags.forEach(e => e.removeAttribute('target'));
        iframe.contentWindow.navigation.addEventListener("navigate", (event) => {
            if (event.destination.url == 'about:srcdoc') return;
            event.preventDefault();
            const oldItem = JSON.parse(window.localStorage.getItem('windowsArray'));
            if (oldItem != null) {
                const newItem = { id: topbarId, link: event.destination.url };
                const targetIndex = oldItem.findIndex(f => f.id === topbarId);
                oldItem[targetIndex] = newItem;
                window.localStorage.setItem('windowsArray', JSON.stringify(oldItem));
            }
            setUrl(event.destination.url);
        });
    }

    useEffect(() => {
        const extractHtmll = async () => {
            try {
                const html = await translateHtml(url);
                setHtml(html);
            } catch (error) {
                console.error(error);
            }
        }

        extractHtmll();

    }, [url]);

    return (
        <div className={styles.box} style={{ top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` }} id={boxId} ref={boxRef}>
            <div className={styles.topbar} id={topbarId}></div>
            <div className={styles.rebtn} onClick={launchWindow}>
                <svg xmlns="http://www.w3.org/2000/svg" id="icon" width="32" height="32" viewBox="0 0 32 32">
                    <path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z" />
                    <polygon points="20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2" />
                    <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" style={{fill: 'none'}} width="32" height="32" />
                </svg>
            </div>
            <div className={styles.closebtn} onClick={(e) => closeWindow()}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#111"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></div>
            <div className={styles.contentBox}>
                <iframe srcDoc={winhtml} frameBorder="0" id={iframeId} onLoad={OnLoadIframe} className={styles.iframe}></iframe>
            </div>
            <div className={styles.right} ref={RightRef}></div>
            <div className={styles.bottom} ref={BottomRef}></div>
        </div>
    )
}

export default DraggableBox;