import * as grpc from '@grpc/grpc-js';
import { UserRequest } from '../proto/UserRequest';
import gymuPackage from '../proto.package';

const client = new gymuPackage.BasketAnalyzeService(
  `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  grpc.credentials.createInsecure(),
);

const recommendExercises = async (userId: number, ids: number[]) =>
  new Promise((resolve, reject) => {
    const request: UserRequest = {
      userId: userId,
      ids: ids,
    };
    client.recommendExercises(request, (error, response) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      resolve(response);
    });
  });

export default {
  recommendExercises,
};
