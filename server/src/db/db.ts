import { PrismaClient } from '@prisma/client'



class DBManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  };

  get = () => {
    return this.prisma;
  };
};

const _dbManager = new DBManager();
export const db = _dbManager.get();