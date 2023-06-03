import { User } from "./schema";

export const createUser = async (
  username: string,
  password: string
) => {
  const newUser = await User.create({username, password}, {isNewRecord: true});
  return newUser;
};

export const validateUser = async (
  username: string,
  password: string
) => {
  const user = await User.findOne({where: {username, password}});
  const userExists = !!user;
  if (userExists) return user;
  return null;
};

export const getUser = async (username: string) => {
  const user = await User.findOne({where: {username}});
  return user;
}