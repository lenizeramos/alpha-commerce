import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { storeUser } from "../../../lib/userService";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.created" && "email_addresses" in evt.data) {
    try {
      const userData = {
        id: evt.data.id,
        email_addresses: evt.data.email_addresses,
        first_name: evt.data.first_name ?? "",
        last_name: evt.data.last_name ?? "",
        image_url: evt.data.image_url ?? "",
      };
      await storeUser(userData);
      console.log("User stored in db 🔥");
    } catch (error) {
      console.error("Error storing user in DB:", error);
      return new Response("Error: Could not store webhook", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
