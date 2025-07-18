"use client"

import { ReactNode, useEffect, useState } from "react"
import { useAccount } from "wagmi"

type Props = {
    children: ReactNode
}

export default function ComplianceGuard({ children }: Props) {
    const { address } = useAccount()
    const [isCompliant, setIsCompliant] = useState(true)

    useEffect(() => {
        if (address) {
            checkCompliance()
        }
    }, [address])

    async function checkCompliance() {
        try {
            const res = await fetch("/api/compliance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address }),
            })

            const result = await res.json()
            console.log("Compliance check result:", result)
            setIsCompliant(result.success && result.isApproved)
        } catch (err) {
            console.error("Compliance check failed", err)
            setIsCompliant(false) // Deny on error (safe default)
        }
    }

    if (isCompliant === null) {
        return <div className="p-4 text-gray-500">Checking compliance...</div>
    }

    if (!isCompliant) {
        return (
            <div className="p-4 text-red-600 text-center font-semibold">🚫 You are denied!!</div>
        )
    }

    return <>{children}</>
}
