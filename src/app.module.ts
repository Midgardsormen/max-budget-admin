import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './api/transactions/transactions.module';
import { HomeModule } from './pages/home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TransactionsModule,
    HomeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
