"use client"
import { useState } from "react"

export function CounterView() {
    const [count, setCount] = useState(0)
    const handlePlusButtonClick = () =>{
        setCount(count + 1)
    }


  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h1>カウンター</h1>
      <p style={{ fontSize: 32 }}>{count}</p>
      <div style={{ marginTop: 16 }}>
        <button onClick={handlePlusButtonClick}>+1</button>
      </div>
    </div>
  )
}