"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const ActiveToggelerUserById = async ({ id }: { id: String }) => {
  try {
    const existingUser = await db.user.findFirst({
      where: { id: id as string },
    });
    if (!existingUser) return { error: "user is not existing!" };

    const updatedUser = await db.user.update({
      where: {
        id: id as string,
      },
      data: {
        isActive: !existingUser.isActive,
      },
    });
    return {
      success: `user activation was fliped to ${updatedUser.isActive}!`,
      updatedUser: updatedUser,
    };
  } catch (e) {
    return { error: "couldn't toggle activation on user" };
  }
};
export const GetAllUsersWithoutPassword = async () => {
  try {
    const users = await db.user.findMany();
    if (!users) return { error: "no users" };
    return { users };
  } catch (e) {
    return { error: "couldn't get users" };
  }
};
export const GetUserWithoutPasswordById = async ({ id }: { id: String }) => {
  try {
    const user = await db.user.findUnique({ where: { id: id as string } });
    if (!user) return { error: "not found" };
    return { user };
  } catch (e) {
    return { error: "couldn't get user" };
  }
};

export const ModeratorToggelerUserById = async ({ id }: { id: String }) => {
  try {
    const existingUser = await db.user.findFirst({
      where: { id: id as string },
    });
    if (!existingUser) return { error: "user is not existing!" };

    if (existingUser.role === UserRole.USER) {
      const updatedUser = await db.user.update({
        where: {
          id: id as string,
        },
        data: {
          role: UserRole.MODERATOR,
        },
      });
      return {
        success: "user role was fliped to moderator!",
        updatedUser: updatedUser,
      };
    } else {
      const updatedUser = await db.user.update({
        where: {
          id: id as string,
        },
        data: {
          role: UserRole.USER,
        },
      });
      return {
        success: "user role was fliped to normal user!",
        updatedUser: updatedUser,
      };
    }
  } catch (e) {
    return { error: "couldn't flip user role" };
  }
};
