import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SupabaseService } from './services/supabase/supabase.service';
import { SupabaseModule } from './services/supabase/supabase.module';

@Module({
  providers: [SharedService, SupabaseService],
  exports: [SharedService],
  imports: [SupabaseModule],
})
export class SharedModule {}
