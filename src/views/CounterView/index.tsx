"use client"
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import EditIcon from '@mui/icons-material/Edit';
import { useCounter } from "./hooks";

export function CounterView() {
    const{
        counters,
        handlePlus,
        handleMinus,
        handleClear,
        handleSetTarget,
        handleAddCounter,
        handleChangeName,
        handleRemoveCounter,
    }= useCounter()

    return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <p style={{ marginBottom: 20, fontSize: 20}}>編み物カウンター</p>

    <div style={{ marginBottom: 20, display: "flex", justifyContent: "flex-end" }}>
        <Button
        variant="contained"
        onClick={handleAddCounter}
        >
        ＋ カウンター追加
        </Button>
    </div>
        
        {counters.map((c) => {
            const remainNumber = c.target - c.count
            const progress =
                c.target > 0
                    ? Math.min((c.count / c.target) * 100, 100)
                    : 0

            return (
                <div key={c.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                    <div>
                        <TextField
                        id={`counter-name-${c.id}`}
                        value={c.name}
                        onChange={(e) => handleChangeName(c.id, e.target.value)}
                        variant="standard"
                        style={{ marginBottom: 8 }}
                        InputProps={{
                            endAdornment: <EditIcon />
                        }}
                        />
                        
                    </div>
                    <p style={{ fontSize: 32, margin: "16px 0" }}>{c.count}</p>
                    
                    <div style={{ marginBottom: 16, display: "flex", justifyContent: "center", gap: 8 }}>
                        <TextField
                            id={`counter-target-${c.id}`}
                            style={{ width: 100 }}
                            type="number"
                            label="目標段数"
                            value={c.target}
                            onChange={(e) => {
                                const num = Number(e.target.value)
                                handleSetTarget(c.id, Math.max(0, num))
                            }}
                        />
                    </div>
                    
                    <p style={{ marginBottom: 16, fontSize: 16 }}>
                        {c.target === 0
                            ? "目標を設定してください"
                            : remainNumber > 0
                            ? `あと${remainNumber}段`
                            : "完成！🎉 "}
                    </p>
                    
                    <div style={{ marginBottom: 16 }}>
                        <LinearProgress variant="determinate" value={progress} color={progress === 100 ? "success" : "primary"}/>
                    </div>
                    
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <Button variant="contained" onClick={() => handlePlus(c.id)} disabled={c.target > 0 && c.count >= c.target}>+1</Button>
                        <Button variant="contained" onClick={() => handleMinus(c.id)} disabled={c.count <= 0}>-1</Button>
                        <Button variant="contained" onClick={() => handleClear(c.id)} disabled={c.count === 0}>リセット</Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        disabled={counters.length === 1}
                                        onClick={() => {
                                            if (counters.length === 1) return
                                            if (window.confirm("本当に削除しますか？")) {
                                                handleRemoveCounter(c.id)
                                            }
                                        }}
                                    >
                                        削除
                                    </Button>
                    </div>
                </div>
            )
        })}
    </div>
    )
}