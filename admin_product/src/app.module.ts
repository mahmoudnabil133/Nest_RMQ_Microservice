import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';

@Module({
  imports: [ProductModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password:'3mod4od123321',
      database: 'Microservice',
      entities: [Product],
      synchronize: true
      
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
