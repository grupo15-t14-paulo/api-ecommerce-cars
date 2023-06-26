import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/comments.entites";

export const deleteCommentService = async (id: string): Promise<void> => {
  const commentsRepo: Repository<Comments> =
    AppDataSource.getRepository(Comments);

  const comment: Comments | null = await commentsRepo.findOne({
    where: {
      id: id,
    },
  });
  await commentsRepo.remove(comment!);
};
