"use client"
import { useState } from "react"

export default function Home() {
    const [item, setItem] = useState('');
    const handleChange = (e) => {
        setItem(e.target.value);
    }
    const handleAddItem = () => {

    }
    
    return <>
        <div className="w-screen flex justify-center py-3 gap-x-2">
            <input className="w-1/2 h-8 rounded-lg text-black" value={item} onChange={handleChange} placeholder="Please enter your item!"></input>
            <button className="w-fit px-2 rounded-lg bg-white text-black" onClick={handleAddItem}>Add</button>
        </div>
    </>
}