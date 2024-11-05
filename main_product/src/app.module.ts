import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://hoda:1234@cluster0.bp3s9ei.mongodb.net/nest_microservice?retryWrites=true&w=majority&appName=Cluster0', 
  {
    autoCreate: true
  }), ProductModule,
  HttpModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
