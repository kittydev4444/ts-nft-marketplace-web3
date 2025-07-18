import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
    try {
        const { address } = await req.json()

        if (!address) {
            return Response.json({ error: "Address is required", success: false }, { status: 400 })
        }

        const idempotencyKey = uuidv4()
        const chain = "ETH-SEPOLIA" // or 'MATIC-AMOY' if you want

        const circleApiKey = process.env.CIRCLE_API_KEY
        if (!circleApiKey) {
            return Response.json({
                error: "Server configuration error",
                success: false,
            })
        }

        const complianceEnabled = process.env.ENABLE_COMPLIANCE_CHECK === "true"

        if (!complianceEnabled) {
            console.log("Compliance check is disable")
            return Response.json({
                success: true,
                isApproved: true,
                data: {
                    result: "APPROVED",
                    message: "Compliance check is disabled",
                },
            })
        }

        const response = await fetch(
            "https://api.circle.com/v1/w3s/compliance/screening/addresses",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${circleApiKey}`,
                },
                body: JSON.stringify({
                    idempotencyKey,
                    address,
                    chain,
                }),
            }
        )

        const data = await response.json()

        const isApproved = data?.data?.result === "APPROVED"
        return Response.json({
            success: true,
            isApproved,
            data: data?.data,
        })
    } catch (error) {
        console.error("Error calling Circle API:", error)
        return Response.json({ error: "Internal server error", status: 500, success: false })
    }
}
