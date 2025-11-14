import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const notificationsRef = db.collection("notifications");
    const snapshot = await notificationsRef
      .orderBy("datetime", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "No notifications found" },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const notification = { id: doc.id, ...doc.data() };
    return NextResponse.json(notification, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notification" },
      { status: 500 }
    );
  }
}
