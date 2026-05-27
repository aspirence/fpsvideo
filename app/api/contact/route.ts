import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const entry = { ...body, receivedAt: new Date().toISOString() };

    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "messages.json");

    let existing: unknown[] = [];
    try {
      const raw = await fs.readFile(file, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      existing = [];
    }
    existing.push(entry);
    await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
