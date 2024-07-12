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
        this.x=Math.floor(Math.random()*(WIDTH-384));
        this.y=Math.floor(Math.random()*(HEIGHT-128));
    }
    updatePosition(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}

export default function Home() {
    const [item, setItem] = useState<string>('');
    const [list, setList] = useState<ItemType[]>([]);
    const handleChange = (e) => {
        setItem(e.target.value);
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
    const handleDragOver = (e) => {
        console.log('dragOver', e);
    }
    const handleDrag = (e) => {
        console.log('handleDrag', e);
    }
    const handleDragEnd = (e) => {
        console.log('handleDragEnd', e);
        // const newList = list.map((item) => {
        //     if(item.id == parseInt(e.target.id)){
        //         item.updatePosition(e.screenX,e.screenY);
        //     } 
        //     return item;
        // });
        console.log(e.screenX,':X    Y:',e.screenY)
        setList(prev => prev.map((item) => {
            if(item.id == parseInt(e.target.id)){
                item.updatePosition(e.screenX,e.screenY);
            } 
            return item;
        }));
    }
    
    return <>
        <div className="w-screen flex justify-center py-3 gap-x-2">
            <input className="w-1/2 h-8 rounded-lg text-black" value={item} onChange={handleChange} placeholder="Please enter your item!"></input>
            <button className="w-fit px-2 rounded-lg bg-white text-black" onClick={handleAddItem}>Add</button>
        </div>
        <div className="w-screen flex">
            {
                list.map((item,index) => <div id={item.id.toString()} key={item.id} draggable='true' onDragEnd={handleDragEnd} className="max-w-96 max-h-32 w-fit h-fit fixed p-2 rounded-lg bg-[#fede67] text-black" style={{top: item.y, left: item.x}} >{item.message}</div>)
            }
        </div>
    </>
}