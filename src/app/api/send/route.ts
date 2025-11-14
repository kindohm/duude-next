import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Parse request body (not used for this operation)
    await request.json();

    const db = getDb();
    const datetime = new Date().toISOString();
    const notificationsRef = db.collection("notifications");
    const docRef = await notificationsRef.add({
      datetime,
    });

    return NextResponse.json(
      { message: "Notification created", id: docRef.id, datetime },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
