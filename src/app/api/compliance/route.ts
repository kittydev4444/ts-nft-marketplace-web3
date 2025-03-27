// app/api/compliance/route.ts
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const { address } = await request.json();

        if (!address) {
            return Response.json({ success: false, message: "Address is required" }, { status: 400 });
        }

        // Generate a new UUID for each request
        const idempotencyKey = uuidv4();

        // Get API key from environment variables
        const apiKey = process.env.CIRCLE_API_KEY;

        if (!apiKey) {
            console.error("Missing CIRCLE_API_KEY environment variable");
            return Response.json(
                { success: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        // Call Circle API for compliance check
        const response = await fetch("https://api.circle.com/v1/w3s/compliance/screening/addresses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                idempotencyKey,
                address,
                chain: "ETH" // Always ETH as specified
            })
        });

        const data = await response.json();

        // Check if the address is approved
        const isApproved = data?.data?.result === "APPROVED";

        return Response.json({
            success: true,
            isApproved,
            data: data?.data
        });

    } catch (error) {
        console.error("Compliance check error:", error);
        return Response.json(
            { success: false, message: "Failed to process compliance check" },
            { status: 500 }
        );
    }
}