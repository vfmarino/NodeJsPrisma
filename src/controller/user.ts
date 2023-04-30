import { Context } from "koa";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { verify } from "jsonwebtoken";
import { config } from "../config";

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

        public static async getUserData(ctx: Context): Promise<void> {
                const authHeader = ctx.request.headers.authorization;
                if (!authHeader) {
                        ctx.throw(401, "Token não fornecido");
                }
                const [, token] = authHeader.split(" ");
                try {
                        const decodedToken = verify(token, config.jwtSecret) as { data: { id: number } };
                        const user = await prisma.user.findUnique({
                                where: { id: decodedToken.data.id },
                        select:{
                                name: true,
                                email:true,
                                telefone:true,
                                cpf:true,
                        }
                });
                        if (!user) {
                                ctx.throw(404, "Usuário não encontrado");
                        }
                        ctx.body = user;
                } catch (err) {
                        console.log(err);
                        ctx.throw(401, "Token inválido");
                }
        }
}