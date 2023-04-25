import { Context } from "koa";
import { PrismaClient } from "@prisma/client";
import { config } from "../config";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default class AuthController {
  public static async login(ctx: Context): Promise<void> {
    try {
      const { email, password } = ctx.request.body;

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if(!user) {
        throw Error("Email inválido");
      }

      const userPassword = user.password;

      if (!await bcrypt.compare(password, userPassword)) {
        throw Error("Falha no login");
      }

      ctx.body = {
        token: jsonwebtoken.sign({
          data: user,
        }, config.jwtSecret),
    
      };

    } catch(err) {
      console.log(err);
      throw Error("Falha no login");
    }
  }

  public static async logout(ctx: Context): Promise<void> {
    ctx.body = { status: "success", message: "Usuário desconectado com sucesso" };
  }
  
}
