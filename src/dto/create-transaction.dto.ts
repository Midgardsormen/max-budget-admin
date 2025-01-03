import {  IsNumber, IsNotEmpty, IsIn,  IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty({ description: 'Montant de la transaction', example: 100.50 })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'Type de la transaction', example: 'income' })
    @IsString()
    @IsNotEmpty()
    @IsIn(['income', 'expense'], { message: "Le type doit être 'income' ou 'expense'." })
    type: string;
  
    @ApiProperty({ description: 'Catégorie de la transaction (e.g. Salaire)', example: 'Salaire' })
    @IsString()
    @IsNotEmpty()
    category: string;
  
    @ApiProperty({ description: 'Description facultative', example: 'Prime de fin d\'année', required: false })
    @IsString()
    @IsOptional()
    description?: string;
  
    @ApiProperty({ description: 'Date de la transaction', example: '2023-12-31' })
    @IsString()
    @IsNotEmpty()
    date: string; // On utilise string pour simplifier le traitement
}