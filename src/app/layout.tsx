import ComplianceGuard from "@/components/ComplianceGuard"
import Header from "@/components/Header"
import type { Metadata } from "next"
import { type ReactNode } from "react"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
    title: "NftMarketplace",
    description: "A non-custodial marketplace for NFTs",
}

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/nft-marketplace.png" sizes="any" />
            </head>
            <body className="bg-zinc-50">
                <Providers>
                    <Header />
                    <ComplianceGuard>{props.children}</ComplianceGuard>
                </Providers>
            </body>
        </html>
    )
}
