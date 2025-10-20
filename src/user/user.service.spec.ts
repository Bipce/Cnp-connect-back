import { Test } from "@nestjs/testing";
import { UserService } from "./user.service";
import { TokenService } from "src/auth/token.service";
import { DatabaseUserRepository } from "./user.repository";
import { PrismaService } from "prisma/prisma.service";

describe("The UserService", () => {
  let userService: UserService;
  let findUniqueOrThrow: jest.Mock;

  beforeEach(async () => {
    findUniqueOrThrow = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        DatabaseUserRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    });
  });
});
