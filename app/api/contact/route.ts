import { NextResponse } from "next/server";
import { addMessage } from "@/lib/queries";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    addMessage({
      name: String(body.name ?? "").trim(),
      email: String(body.email ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      service: String(body.service ?? "").trim(),
      message: String(body.message ?? "").trim()
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
