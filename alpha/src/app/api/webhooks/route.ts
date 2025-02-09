/* import { Webhook } from "svix";
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

  const eventType = evt.type;

  if (eventType === "user.created" && "email_addresses" in evt.data) {
    try {
      await storeUser(evt.data);
      console.log("User stored in db 🔥");
    } catch (error) {
      console.error("Error storing user in DB:", error);
      return new Response("Error: Could not store webhook", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
 */

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
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

  // Do something with payload
  // For this guide, log payload to console
  //const { id } = evt.data;
  const eventType = evt.type;
  // console.log("*********** HERE ***********");
  // console.log(`Received webhook with ID ${id} and event type of ${eventType}`);

  console.log("Webhook payload:", body);
  console.log("*********** -- user -- ***********\n\n\n");

  interface ClerkUserCreatedEvent {
    id: string;
    email_addresses: Array<{
      id: string;
      email_address: string;
    }>;
    first_name: string;
    last_name: string;
    image_url: string;
  }

  /* TODO: User prisma to store the user info in db. */
  if (eventType === "user.created" && "email_addresses" in evt.data) {
    const data = evt.data as ClerkUserCreatedEvent;

    const user = {
      clerkId: evt.data.id,
      email: data.email_addresses[0]?.email_address || "",
      firstName: evt.data.first_name || "",
      lastName: evt.data.last_name || "",
      photo: evt.data.image_url || "",
    };

    console.log("*********** -- user -- ***********\n\n\n");
    console.log(user);

    //store it in our mongodb:

    try {
      /* UPSERT == Update or Create/Insert */
      await prisma.user.upsert({
        where: { clerkId: user.clerkId },
        update: {
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          photo: user.photo,
        },
        create: {
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          photo: user.photo,
        },
      });
      console.log("User stored in db 🔥");
    } catch (error) {
      console.error("Error storing webhook:", error);
      return new Response("Error: Could not store webhook", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
