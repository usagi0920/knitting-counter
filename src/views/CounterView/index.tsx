"use client"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

export function CounterView() {

    const [count, setCount] = useState(0)
    const [target, setTarget] = useState(0)

    // 初回読み込み
    useEffect(() => {
    const saved = localStorage.getItem("count")
    if (saved !== null) {
        setCount(Number(saved))
    }
    }, [])

    useEffect(() => {
    const savedTarget = localStorage.getItem("target")
    if (savedTarget !== null) {
        setTarget(Number(savedTarget))
    }
    }, [])

    // 保存
    useEffect(() => {
    localStorage.setItem("count", String(count))
    }, [count])

    useEffect(() => {
    localStorage.setItem("target", String(target))
    }, [target])

    const handlePlusOneButtonClick = () =>{
        setCount(count + 1)
    }
    const handleMinusOneButtonClick = () =>{
        if(count <= 0) return
        setCount(count - 1)
    }
    const handleClearButtonClick = () =>{
        setCount(0)
    }

    const handleClearTarget = () =>{
        setTarget(0)
    }

    const remainNumber = target - count




  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h1>カウンター</h1>
      <p style={{ fontSize: 32 }}>{count}</p>
      <div style={{ marginTop: 16 }}>
        <TextField
            type="number"
            label="目標段数"
            value={target}
            onChange={(e) => {
            const num = Number(e.target.value)
            setTarget(Math.max(0, num))
            }}
        />
        <Button variant="contained" onClick={handleClearTarget} disabled={target === 0}>目標クリア</Button>

        <p>
            {target === 0
            ? "目標を設定してください"
            : remainNumber > 0
            ? `あと${remainNumber}段`
            : "🎉 完成！お疲れさま！"}
        </p>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button variant="contained" onClick={handlePlusOneButtonClick} disabled={target > 0 && count >= target}>+1</Button>
        <Button variant="contained" onClick={handleMinusOneButtonClick} disabled={count <= 0}>-1</Button>
        <Button variant="contained" onClick={handleClearButtonClick} disabled={count === 0}>クリア</Button>
      </div>
    </div>
  )
}