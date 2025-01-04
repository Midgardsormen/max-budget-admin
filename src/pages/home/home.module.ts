import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { SupabaseService } from '@app/shared/services/supabase/supabase.service';

@Module({
  controllers: [HomeController],
  providers: [SupabaseService],
})
export class HomeModule {}
