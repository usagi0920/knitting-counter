"use client"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { useCounter } from "./hooks";

export function CounterView() {
    const{
         count,
    target,
    setTarget,
    handlePlus,
    handleMinus,
    handleClear,
    handleClearTarget,
    remainNumber,
    progress,
    }= useCounter()


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
            <Button variant="contained" onClick={handlePlus} disabled={target > 0 && count >= target}>+1</Button>
            <Button variant="contained" onClick={handleMinus} disabled={count <= 0}>-1</Button>
            <Button variant="contained" onClick={handleClear} disabled={count === 0}>リセット</Button>
      </div>
    </div>
  )
}