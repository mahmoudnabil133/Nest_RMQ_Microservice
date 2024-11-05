import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options:{
      urls: ['amqps://sbbbukws:Pxcb36R0PlEVoe7Q9BNWiZl6GFEj2iPQ@woodpecker.rmq.cloudamqp.com/sbbbukws'],
      queue: 'main_queue',
      queueOptions:{
        durable: true  
      },
    }
  }); 
  await app.listen();
  console.log('Microservice is listening');


}
bootstrap();
