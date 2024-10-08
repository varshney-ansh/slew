import { useEffect } from "react";


export default function useResize(refBox, refBottom, refRight){

    useEffect(()=>{

        const resizableElement = refBox.current;
        const orgId = refBox.current.id;
        const id = orgId.toString().substring(3);
        const data = JSON.parse(window.localStorage.getItem(id));
        const styles = window.getComputedStyle(resizableElement);
        let width = parseInt(styles.width, 10);
        let height = parseInt(styles.height, 10);

        let xCord = 0;
        let yCord = 0;

        //Right 
        const onMouseMoveRightResize = (event) =>{
            const dx = event.clientX - xCord;
            xCord = event.clientX;
            width = width + dx;
            if(data != null){
                const newData = {
                    id: data.id,
                    top: data.top,
                    left: data.left,
                    height: data.height,
                    width: width
                }            
                window.localStorage.setItem(id, JSON.stringify(newData));
            }
            resizableElement.style.width = `${width}px`;
        };

        const onMouseUpRightResize = (event) =>{
           document.removeEventListener("pointermove", onMouseMoveRightResize);
        };

        const onMouseDownRightResize = (event) =>{
            xCord = event.clientX
            resizableElement.style.left = styles.left;
            resizableElement.style.right = null;
            document.addEventListener("pointermove", onMouseMoveRightResize);
            document.addEventListener("pointerup", onMouseUpRightResize);
            document.addEventListener("pointerout", onMouseUpRightResize);
        };

        //bottom
        const onMouseMoveBottomResize = (event) =>{
            const dy = event.clientY - yCord;
            height = height + dy;
            yCord = event.clientY;
            if(data != null){
                const newData = {
                    id: data.id,
                    top: data.top,
                    left: data.left,
                    height: height,
                    width: data.width
                }            
                window.localStorage.setItem(id, JSON.stringify(newData));
            }
            resizableElement.style.height = `${height}px`;
            
        }

        const onMouseUpBottomResize = (event) =>{
            document.removeEventListener("pointermove", onMouseMoveBottomResize);
         };
 
         const onMouseDownBottomResize = (event) =>{
             yCord = event.clientY
             const styles = window.getComputedStyle(resizableElement);
             resizableElement.style.top = styles.top;
             resizableElement.style.bottom = null;
             document.addEventListener("pointermove", onMouseMoveBottomResize);
             document.addEventListener("pointerup", onMouseUpBottomResize);
             document.addEventListener("pointerout", onMouseUpBottomResize);
         };

         // Mouse down event listener
         const resizeRight = refRight.current;
         resizeRight.addEventListener("pointerdown", onMouseDownRightResize);

         const resizeBottom = refBottom.current;
         resizeBottom.addEventListener("pointerdown", onMouseDownBottomResize);

         const cleanup = () =>{
            resizeBottom.removeEventListener("pointerdown", onMouseDownBottomResize);
            resizeRight.removeEventListener("pointerdown", onMouseDownRightResize);
         }

         return cleanup;

    }, [refBox]);

}