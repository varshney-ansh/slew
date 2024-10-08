'use client'

import ResContainer from "@/components/rescon/rescon";
import WindowSystem from "../windowSystem/windowSystem";
import { useState, useMemo, useEffect, useRef } from "react";
import DraggableBox from "../draggableBox/draggableBox";
import Link from "next/link";

const WindowOnSearch = ({ result, styles, page, q }) => {

    const container = useRef();
    const [items, setItems] = useState([]);
    const [pages, setPages] = useState([1, 2, 3, 4, 5]);
    let pagination = pages;

    useEffect(() => {
        const windowsArray = JSON.parse(window.localStorage.getItem('windowsArray'));
        if (windowsArray != null) {
            setItems(windowsArray);
        }
    }, []);

    useEffect(() => {
        const containerBox = container.current;

        const ContextMenu = (e) => {
            e.preventDefault();
            if (e.srcElement.href) {
                const newitem = e.srcElement.href;
                var id = "id" + Math.random().toString(16).slice(2);
                const newItem = { id: id, link: newitem };
                window.localStorage.setItem('windowsArray', JSON.stringify([...items, newItem]));
                setItems([...items, newItem]);
            }
        }

        containerBox.addEventListener('contextmenu', ContextMenu);

        const cleanup = () => {
            removeEventListener('contextmenu', ContextMenu);
        }

        return cleanup;
    }, [items]);

    const memorizedItem = useMemo(() => items.map((item) => {
        const item_data = JSON.parse(window.localStorage.getItem(item.id));
        return (
            <DraggableBox boxId={`box${item.id}`} setItems={setItems} width={item_data != null ? item_data.width : 301} height={item_data != null ? item_data.width : 301} topbarId={item.id} top={item_data != null ? item_data.top : 60} left={item_data != null ? item_data.left : 60} iframeId={`iframe${item.id}`} link={item.link} key={item.id} />
        )
    }), [items]);

    if (result.length < 20) {
        pagination = pages.slice(0, page);
    }

    if (result.length >= 20 && pagination[4] == page) {
        pagination.push(parseInt(page) + 1);
        pagination.shift();
    }

    if (result.length >= 20 && pagination[0] == page) {
        if (page >= 2) {
            pagination = [parseInt(page) - 1, ...pagination];
            if (pagination.length > 5) {
                pagination.pop();
                setPages(pagination);
            }
            setPages(pagination);
        }
    }

    return (
        <>
            <WindowSystem selector={'#windowSystem'}>
                {memorizedItem}
            </WindowSystem>

            <div className={styles.results} >
                <div className={styles.content} ref={container}>
                    {!result.error ? result.map((res) => {
                        return (
                            <ResContainer res={res._source} key={res._id} />
                        )
                    }) : (<div className={styles.noResultContainer}>
                        <span>Your search <strong>- {`${q}`} - </strong>did not match any documents.</span>
                        <div className={styles.noresuggestion}>
                            <span>Suggestions:</span>
                            <div>
                                <li>Make sure that all words are spelled correctly.</li>
                                <li>Try different keywords.</li>
                                <li>Try more general keywords.</li>
                                <li>Try fewer keywords.</li>
                            </div>
                        </div>
                    </div>)}
                    {pagination.length > 0 && !result.error ? (
                        <div className={styles.pagination}>
                            <div className={styles.leftArrow} style={page > 0 ? { display: 'block' } : { display: 'none' }}>
                                <Link href={`/search?q=${q}&page=${page - 1}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="icon" x="0px" y="0px" viewBox="0 0 32 32" >
                                        <polygon points="10,16 20,6 21.4,7.4 12.8,16 21.4,24.6 20,26 " />
                                        <rect id="_x3C_Transparent_Rectangle_x3E_" style={{ fill: 'none' }} width="32" height="32" />
                                    </svg>
                                </Link>
                            </div>
                            <div className={styles.pages}>
                                {pagination.length > 0 ? pagination.map((index) => {
                                    return (
                                        <li className={index == page ? styles.active : ``} key={index}>
                                            <Link href={`/search?q=${q}&page=${index}`}>
                                                {index}
                                            </Link>
                                        </li>
                                    )
                                }) : ``}
                            </div>
                            <div className={styles.rightArrow} style={result.length < 20 ? { display: 'none' } : { display: 'block' }}>
                                <Link href={`/search?q=${q}&page=${parseInt(page) + 1}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="icon" x="0px" y="0px" viewBox="0 0 32 32" >
                                        <polygon points="10,16 20,6 21.4,7.4 12.8,16 21.4,24.6 20,26 " />
                                        <rect id="_x3C_Transparent_Rectangle_x3E_" style={{ fill: 'none' }} width="32" height="32" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ) : ``}
                </div>
            </div>
        </>
    )
}

export default WindowOnSearch;