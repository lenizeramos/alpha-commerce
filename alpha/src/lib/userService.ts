import prisma from "./prisma";

export interface ClerkUserCreatedEvent {
  id: string;
  email_addresses: Array<{ id: string; email_address: string }>;
  first_name: string;
  last_name: string;
  image_url: string;
}

export async function storeUser(data: ClerkUserCreatedEvent) {
  const user = {
    clerkId: data.id,
    email: data.email_addresses[0]?.email_address || "",
    firstName: data.first_name || "",
    lastName: data.last_name || "",
    photo: data.image_url || "",
  };

  return prisma.user.upsert({
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
}
