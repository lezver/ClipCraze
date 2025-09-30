import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = `
    📩 Нова заявка з форми:
    👤 Ім'я: ${body.name}
    🏷️ Нік: ${body.nickname}
    📧 Email: ${body.email}
    `;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const { data } = await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML",
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error(
      "Telegram API error::",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
