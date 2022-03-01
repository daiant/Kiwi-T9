import e from "express";
import React, { useRef, useState } from "react";

export function Nokia(props: any) {
    const [position, setPosition] = useState(0);
    const [animation, setAnimation] = useState(false);
    const [clientY, setClientY] = useState(0);
    const button_holder = React.useRef<HTMLDivElement>(null);
    const buttons = [
        {id: 1, abc: []},
        {id: 2, abc: ["a", "b", "c"]},
        {id: 3, abc: ["d", "e", "f"]},
        {id: 4, abc: ["g", "h", "i"]},
        {id: 5, abc: ["j", "k", "l"]},
        {id: 6, abc: ["m", "n", "o"]},
        {id: 7, abc: ["p", "q", "r", "s"]},
        {id: 8, abc: ["t", "u", "v"]},
        {id: 9, abc: ["w", "x", "y", "z"]},
        {id: "Clear", abc: []},
        {id: 0, abc: []},
        {id: "Delete", abc: []}
    ];

    function predict(e: React.SyntheticEvent) {
        e.preventDefault();
        let input: HTMLElement | null  = document.getElementById("text-input");
        if(input !== null) props.handleQuery((input as HTMLInputElement).value);
    }
    function addNumber(number: number | string) {
        let input: HTMLElement | null = document.getElementById("text-input");
        if(typeof number == "string") {
        if(number === "Clear") {
            props.handleQuery("");
            props.handlePrediction([""]);
            if(input !== null) {
            (input as HTMLInputElement).value = "";
            }
        } else if(number === "Delete") {
            props.handleQuery((prev: string) => {
            if(prev.length <= 1) props.handlePrediction([""])
            return prev.slice(0, -1)});
            if(input !== null) {
            (input as HTMLInputElement).value = (input as HTMLInputElement).value.slice(0, -1);
            }
        }
        return;
        };
        
        if(input !== null) {
        (input as HTMLInputElement).value += number.toString();
        }
        props.handleQuery((prev: string) => {
        return prev + number.toString();
        })
    }

    function slideNokia(e: React.TouchEvent<HTMLDivElement>) {
        let buttonHeight = button_holder.current?.clientHeight || 0;
        let newPosition = clientY - e.touches[0].clientY; 
        
        if(newPosition <= 0 && newPosition >= buttonHeight*-1) {
            setPosition(newPosition);
        }      
        
    }
    function initializePosition(e: React.TouchEvent<HTMLDivElement>) {
        if(clientY == 0) {
            setClientY(e.touches[0].clientY);
        }
    }
    function snapPosition() {
        setAnimation(true);
        const buttonHeight = button_holder.current?.clientHeight || 350;
        if(position <= buttonHeight*-1 / 2) {
            setPosition(buttonHeight*-1);
         }
        else {
            setPosition(0)
        }
        setTimeout(() => setAnimation(false), 300);
    }

    return (
    <div id='nokia' className={animation ? "smooth" : ""}style={{bottom: position}}>
        <div className="moving" onTouchStart={initializePosition}onTouchMove={slideNokia} onTouchEnd={snapPosition}>
            <div id="slider"></div>
        </div>
        <form className="form" onSubmit={(e:React.FormEvent)=> e.preventDefault()}>
            <input type="number" autoComplete="off" id="text-input" maxLength={5} onChange={predict} placeholder='Input a number' ></input>
        </form>
        <div className='button-holder' ref={button_holder}>
            {buttons.map((item, index: number) => {
                let special = index == 9 || index == 11;
                return <div className={special ? "button special" : "button"} key={index} onClick={() => addNumber(item.id)}>
                <div className="id">{item.id}</div>
                <div className="letters">{item.abc.join("")}</div>
                </div>}
            )}
        </div>
    </div>
    )
}