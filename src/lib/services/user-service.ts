import { prisma } from "../prisma";

export default class UserService {
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      omit: { password: true },
    });
    return user;
  }

  async createUser(email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        email,
        password, // In a real application, ensure to hash the password before storing it
      },
      omit: { password: true },
    });
    return user;
  }
}
