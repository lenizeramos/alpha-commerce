/* // pages/api/user.js
import prisma from '../../lib/prisma';

export async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, email } = req.body;

    // Salvar o usuário no MongoDB
    const user = await prisma.user.create({
      data: {
        clerkUserId: userId,
        email: email,
      },
    });

    res.status(200).json(user);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
 */