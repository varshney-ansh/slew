import { useRef, useEffect } from 'react';

export default function useDragger(boxId, topbarId){

    const isClicked = useRef(false);
    const coords = useRef({
        startX: 514,
        startY: 60,
        lastX: 0,
        lastY: 0
    });

    useEffect(()=>{
        const target = document.getElementById(boxId);
        const topbar = document.getElementById(topbarId);

        if(!target) throw new Error("Element with given id doesn't exists");
        const container = target.parentElement;
        if(!container) throw new Error("Empty parent element");

        const initialX = document.getElementById(boxId).getBoundingClientRect().left;
        const initialY = document.getElementById(boxId).getBoundingClientRect().top;

        coords.current.lastX = initialX;
        coords.current.lastY = initialY;

        const onMouseDown = (e) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;

            target.style.cursor = 'grab';
        }

        const onMouseUp = () => {
            isClicked.current = false;
            coords.current.lastX = target.offsetLeft;
            coords.current.lastY = target.offsetTop;

            target.style.cursor = 'default';
        }

        const onMouseMove = (e) => {
            if(!isClicked.current) return;

            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY; 

            target.style.top = `${nextY}px`;
            target.style.left = `${nextX}px`;

            const { width, height } = target.getBoundingClientRect();

            window.localStorage.setItem(topbarId, JSON.stringify({top: nextY, left: nextX, id: topbarId, width: width, heigth: height}));

            target.style.cursor = 'grabbing';
        }

        topbar.addEventListener('pointerdown', onMouseDown);
        topbar.addEventListener('pointerup', onMouseUp);
        container.addEventListener('pointermove', onMouseMove);
        container.addEventListener('pointerleave', onMouseUp);        

        const cleanup = () => {
            topbar.removeEventListener('pointerdown', onMouseDown);
            topbar.removeEventListener('pointerup', onMouseUp);
            container.removeEventListener('pointermove', onMouseMove);
            container.removeEventListener('pointerleave', onMouseUp);
        }

        return cleanup;
    }, [boxId])
}