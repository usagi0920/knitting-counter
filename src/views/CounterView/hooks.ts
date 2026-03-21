import { useEffect, useState } from "react"

export function useCounter() {
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(0)

  // 初回読み込み
  useEffect(() => {
    const savedCount = localStorage.getItem("count")
    const savedTarget = localStorage.getItem("target")

    if (savedCount !== null) setCount(Number(savedCount))
    if (savedTarget !== null) setTarget(Number(savedTarget))
  }, [])

  // 保存
  useEffect(() => {
    localStorage.setItem("count", String(count))
    localStorage.setItem("target", String(target))
  }, [count, target])

  const handlePlus = () => {
    if (target > 0 && count >= target) return
    setCount(count + 1)
  }

  const handleMinus = () => {
    if (count <= 0) return
    setCount(count - 1)
  }

  const handleClear = () => {
    setCount(0)
  }

  const handleClearTarget = () => {
    setTarget(0)
  }

  const remainNumber = target - count
  const progress = target > 0 ? Math.min((count / target) * 100, 100) : 0

  return {
    count,
    target,
    setTarget,
    handlePlus,
    handleMinus,
    handleClear,
    handleClearTarget,
    remainNumber,
    progress,
  }
}