"use client"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";

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

    const progress = target > 0 ? (count / target) * 100 : 0




  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
    <p style={{ marginBottom: 20, fontSize: 20}}>編み物カウンター</p>
      <h1>段数</h1>
      <p style={{ fontSize: 32 }}>{count}</p>
      <div style={{ marginTop: 16,display: "flex", justifyContent: "center", gap:8}}>
            <TextField
                style={{ width: 100 }}
                type="number"
                label="目標段数"
                value={target}
                onChange={(e) => {
                const num = Number(e.target.value)
                setTarget(Math.max(0, num))
                }}
            />
            <Button variant="contained" onClick={handleClearTarget} disabled={target === 0}>目標リセット</Button>
        </div>
            <p style={{ marginTop: 16, fontSize: 18 }}>
                {target === 0
                ? "目標を設定してください"
                : remainNumber > 0
                ? `あと${remainNumber}段`
                : "完成！🎉 "}
                
            </p>
        <div style={{ marginTop: 16 }}><LinearProgress variant="determinate" value={progress} color={progress === 100 ? "success" : "primary"}/></div>
      
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16}}>
            <Button variant="contained" onClick={handlePlusOneButtonClick} disabled={target > 0 && count >= target}>+1</Button>
            <Button variant="contained" onClick={handleMinusOneButtonClick} disabled={count <= 0}>-1</Button>
            <Button variant="contained" onClick={handleClearButtonClick} disabled={count === 0}>リセット</Button>
      </div>
    </div>
  )
}