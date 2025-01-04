import { Controller, Get, Render } from '@nestjs/common';
import { SupabaseService } from '@app/shared/services/supabase/supabase.service';

@Controller()
export class HomeController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('home')
  @Render('Home')
  async getHome() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('transactions').select('*');
    if (error) {
      throw new Error(error.message);
    }
    // On retourne l’objet qui sera injecté dans la vue Svelte
    return { transactions: data };
  }
}
