import { Module } from '@nestjs/common';
import { AppController, FrontController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from '@app/shared/services/supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule
  ],
  controllers: [AppController, FrontController],
  providers: [AppService],
})
export class AppModule {}
