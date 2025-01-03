import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupabaseService } from '@app/shared/services/supabase/supabase.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';


@ApiTags('Budget Management')
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly supabaseService: SupabaseService
  ) {}


  @ApiOperation({ summary: 'Récupérer toutes les transactions' })
  @Get('transactions')
  async getEntries() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('transactions').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  @ApiOperation({ summary: 'Ajouter une nouvelle transaction' })
  @Post('transactions')
  async createEntry(@Body() createTransactionDto: CreateTransactionDto) {
    const supabase = this.supabaseService.getClient();
    const { amount, type, category, description, date } = createTransactionDto;

    const { data, error } = await supabase.from('transactions').insert([
      {
        amount,
        type,
        category,
        description,
        date,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

@Controller()
export class FrontController {
  constructor(
    private readonly supabaseService: SupabaseService
  ) {}

  @Get('transactions-list')
  @Render('Home')
   async getTransactions() {
     const supabase = this.supabaseService.getClient();
     const { data, error } = await supabase.from('transactions').select('*');
     if (error) {
       throw new Error(error.message);
     }
     return {transactions: data};
   }
}
