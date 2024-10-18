"use client"
import { useState } from "react"
import { HEIGHT, WIDTH } from './constants';

class ItemType {
    id=0;
    message='';
    x=0;
    y=0;

    constructor(id:number,message:string){
        this.id=id;
        this.message=message;
        this.x=Math.floor(Math.random()*(WIDTH));
        this.y=Math.floor(Math.random()*(HEIGHT));
    }
    updatePosition(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}

export default function Home() {
    const [item, setItem] = useState<string>('');
    const [list, setList] = useState<ItemType[]>([]);
    const [delX,setDelX] = useState(0);
    const [delY,setDelY] = useState(0);
    const [dragEnd,setDragEnd] = useState(0);
    const handleChange = (e) => {
        setItem(e.target.value);
    }
    const handleKeyDown = (e) => {
        if(e.code == 'Enter'){
            if(item.length > 0){
                setList(prev => [
                    ...prev,
                    new ItemType(prev.length, item)
                ]);
                setItem('');
            }
        }
    }
    const handleAddItem = () => {
        if(item.length > 0){
            setList(prev => [
                ...prev,
                new ItemType(prev.length, item)
            ]);
            setItem('');
        }
    }
    const handleMouseDown = (e) => {
        e.preventDefault();
        const elementInfo = e.target.getBoundingClientRect();
        if(dragEnd == 0){
            setDelX(e.pageX - elementInfo.x);
            setDelY(e.pageY - elementInfo.y);
            setDragEnd(1);
        }
        document.onmouseup = closeDragElement
        document.onmousemove = handleElementDrag
    }
    const handleElementDrag = (e) => {
        setList(prev => prev.map((item) => {
            if(item.id == parseInt(e.target.id)){
                item.updatePosition(e.pageX-delX,e.pageY-delY);
            } 
            return item;
        }));
    }
    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        setDragEnd(0);
    }
    
    return <>
        <div className="w-screen flex justify-center py-3 gap-x-2">
            <input className="w-1/2 h-8 rounded-lg text-black" value={item} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Please enter your item!"></input>
            <button className="w-fit px-2 rounded-lg bg-white text-black" onClick={handleAddItem}>Add</button>
        </div>
        <div className="w-screen flex">
            {
                list.map((item,index) => 
                <div id={item.id.toString()} key={item.id} draggable='true' onMouseDown={handleMouseDown} className="max-w-96 max-h-32 w-fit h-fit absolute p-2 rounded-lg bg-[#fede67] text-black" 
                style={{top: item.y, left: item.x}} >
                    {item.message}
                </div>)
            }
        </div>
    </>
}