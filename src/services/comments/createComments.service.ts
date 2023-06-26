import { Repository } from "typeorm";
import { Comments } from "../../entities/comments.entites";
import { IComments } from "../../interfaces/comments.interface";
import { commentsCreateSchema, returnCommentSchema } from "../../schemas/comments.schema";
import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";

export const createCommentsService = async (
  data: IComments,
  announcementId: string,
  userId: string
): Promise<IComments> => {
  const commentRepo: Repository<Comments> =
    AppDataSource.getRepository(Comments);
  const announcementRepo: Repository<Car> = AppDataSource.getRepository(Car);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const announcement = await announcementRepo.findOneBy({
    id: announcementId,
  });
  const user = await userRepo.findOneBy({
    id: userId,
  });

  const createComment: Comments = commentRepo.create({
    ...data,
    car: announcement!,
    user: user!,
  });

  await commentRepo.save(createComment);
  return returnCommentSchema.parse(createComment);
};
