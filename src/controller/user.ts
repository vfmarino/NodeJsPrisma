import { Context } from "koa";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default class UserController {
        public static async create(ctx: Context): Promise<void> {
                const { password: _password, ...userData } = ctx.request.body;
                const password = await bcrypt.hash(_password, 10);
                const user = await prisma.user.create({
                        data: {
                                ...userData,
                                password
                        }
                });
                ctx.body = user;
        }

        public static async update(ctx: Context): Promise<void> {
                const { id } = ctx.params;
                const { password: _password, ...userData } = ctx.request.body;
                const password = await bcrypt.hash(_password, 10);
                const updatedUser = await prisma.user.update({
                        where: { id: parseInt(id) },
                        data: {
                                ...userData,
                                password,
                        },
                });
                ctx.body = updatedUser;
        }
        public static async findById(ctx: Context): Promise<void> {
                const { id } = ctx.params;
                const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
                if (!user) {
                        ctx.status = 404;
                        ctx.body = { message: "User not found" };
                        return;
                }
                ctx.body = user;
        }

        public static async findByEmail(ctx: Context): Promise<void> {
                const { email } = ctx.params;
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) {
                        ctx.status = 404;
                        ctx.body = { message: "User not found" };
                        return;
                }
                ctx.body = user;
        }

        public static async delete(ctx: Context): Promise<void> {
                const { id } = ctx.params;
                await prisma.user.delete({ where: { id: parseInt(id) } });
                
                ctx.status = 204;
        }
}