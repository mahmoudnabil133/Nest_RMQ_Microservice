import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options:{
        urls: ['amqps://sbbbukws:Pxcb36R0PlEVoe7Q9BNWiZl6GFEj2iPQ@woodpecker.rmq.cloudamqp.com/sbbbukws'],
        queue: 'main_queue',
        queueOptions: {
          durable: true
        }
      }
    }
  ]) 

],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
