import { Repository } from "typeorm";
import { IComments, IUpdateComment } from "../../interfaces/comments.interface";
import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities/comments.entites";
import { returnPatchComment } from "../../schemas/comments.schema";

export const updateComentService = async (
  data: IUpdateComment,
  comentId: string
): Promise<IComments> => {
  const commentRepo: Repository<Comments> =
    AppDataSource.getRepository(Comments);
  const findComment: Comments | null = await commentRepo.findOneBy({
    id: comentId,
  });

  const comment: IComments = commentRepo.create({
    ...findComment,
    ...data,
  });

  await commentRepo.save(comment);

  const updateComment = returnPatchComment.parse(comment);

  return updateComment;
};
