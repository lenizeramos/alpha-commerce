import { NextResponse } from "next/server";
import client from "../../../lib/contentful";

export async function GET() {
  try {
    const entries = await client.getEntries({ content_type: "menu", include: 2 });
    return NextResponse.json( entries.items );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data from Contentful", err },
      { status: 500 }
    );
  }
}
