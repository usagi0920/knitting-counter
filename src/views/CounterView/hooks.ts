import { useEffect, useState } from "react"

export function useCounter() {

    const [counters, setCounters] = useState([
  { id: 1, name: "カウンター1", count: 0, target: 0 }
])

  // 読み込み
useEffect(() => {
  const saved = localStorage.getItem("counters")
  if (saved) setCounters(JSON.parse(saved))
}, [])

// 保存
useEffect(() => {
  localStorage.setItem("counters", JSON.stringify(counters))
}, [counters])

const handlePlus = (id: number) => {
  setCounters((prev) =>
    prev.map((c) =>
      c.id === id
        ? { ...c, count: c.count + 1 }
        : c
    )
  )
}

  const handleMinus = (id: number) => {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === id && c.count > 0
          ? { ...c, count: c.count - 1 }
          : c
      )
    )
  }

  const handleClear = (id: number) => {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, count: 0 }
          : c
      )
    )
  }

 const handleSetTarget = (id: number, value: number) => {
  setCounters(prev =>
    prev.map(c =>
      c.id === id ? { ...c, target: value } : c
    )
  )
 }

 const handleAddCounter = () => {
  setCounters(prev => [
    ...prev,
    {
      id: Date.now(),
      name: `カウンター${prev.length + 1}`,
      count: 0,
      target: 0
    }
  ])
}

const handleChangeName = (id: number, name: string) => {
  setCounters(prev =>
    prev.map(c =>
      c.id === id
        ? { ...c, name }
        : c
    )
  )
}

const handleRemoveCounter = (id: number) => {
  setCounters(prev => prev.filter(c => c.id !== id))
}


  return {
    counters,
    handlePlus,
    handleMinus,
    handleClear,
    handleSetTarget,
    setCounters,
    handleAddCounter,
    handleChangeName,
    handleRemoveCounter,
  }
}