import { ClerkProvider, RedirectToSignIn, useUser } from '@clerk/nextjs';

export function useAuth() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null; // ou retornar um loader

  return user;
}
