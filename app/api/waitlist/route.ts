import { prisma } from "@/lib/prisma";

// Basic sanity: EVM addresses are 42 chars (0x + 40 hex), Solana are 32-44 base58 chars.
// This covers both without importing a heavy validation lib.
const WALLET_REGEX = /^(0x[0-9a-fA-F]{40}|[1-9A-HJ-NP-Za-km-z]{32,44})$/;

type WaitlistRequestBody = {
  walletAddress?: unknown;
};

export async function POST(request: Request) {
  let walletAddress: string;

  try {
    const body = (await request.json()) as WaitlistRequestBody;
    walletAddress = typeof body.walletAddress === "string" ? body.walletAddress.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!walletAddress) {
    return Response.json({ error: "walletAddress is required." }, { status: 400 });
  }

  if (walletAddress.length > 100 || !WALLET_REGEX.test(walletAddress)) {
    return Response.json({ error: "Invalid wallet address format." }, { status: 422 });
  }

  try {
    const entry = await prisma.waitlistEntry.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });

    return Response.json({ id: entry.id }, { status: 201 });
  } catch (err) {
    console.error("[waitlist] Failed to save entry");
    if (process.env.NODE_ENV !== "production") console.error(err);
    return Response.json({ error: "Failed to save. Please try again." }, { status: 500 });
  }
}
