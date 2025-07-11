import { prisma } from "../prisma";

export default class UserService {
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      omit: { password: true },
    });
    return user;
  }
}
