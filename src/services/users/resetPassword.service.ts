import { randomUUID } from "node:crypto";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { emailService } from "../../utils/sendEmail.utils";
import { hashSync } from "bcryptjs";

class ResetPasswordService {
  async sendEmailResetPassword(email: string) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const resetToken = randomUUID();
    user.reset_token = resetToken;

    await userRepository.save(user);

    const resetPasswordTemplate = emailService.resetPasswordTemplate(
      user.name,
      email,
      resetToken
    );

    await emailService.sendEmail(resetPasswordTemplate);
  }

  async resetUserPassword(password: string, resetToken: string | null) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        reset_token: resetToken!,
      },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const newPasswordHashed = hashSync(password, 10);

    user.password = newPasswordHashed;
    user.reset_token = null!;

    await userRepository.save(user);
  }
}

const resetPasswordService = new ResetPasswordService();

export { resetPasswordService };
