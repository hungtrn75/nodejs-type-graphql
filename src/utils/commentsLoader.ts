import DataLoader from "dataloader";
import { Comment } from "../entity/Comment";
import { In } from "typeorm";

type BatchComment = (ids: number[]) => Promise<Comment[][]>;

const batchComments: BatchComment = async ids => {
  const comments = await Comment.find({ where: { id: In(ids) } });
  const commentMap: { [key: number]: Comment[] } = {};
  comments.forEach(u => {
    if (u.postId in commentMap) {
      commentMap[u.postId].push(u);
    } else {
      commentMap[u.postId] = [u];
    }
  });
  return ids.map(id => (commentMap[id] ? commentMap[id] : []));
};

export const createCommentsLoader = () =>
  new DataLoader<number, Comment[]>(batchComments);
