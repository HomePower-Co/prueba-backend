// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';  // Asegúrate de que PrismaService esté correctamente importado

@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // Exporta PrismaService para que otros módulos puedan usarlo
})
export class PrismaModule {}
