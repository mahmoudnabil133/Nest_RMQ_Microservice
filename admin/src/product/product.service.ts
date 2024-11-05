import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ){}
    async findAll(): Promise<Product[]>{
        console.log('emmiting messsage from client')
        this.client.emit('hello', 'hello from product service rmq');
        return await this.productRepository.find();
    }
    async findOne(id: number): Promise<Product>{
        return await this.productRepository.findOneBy({id});
    }
    async create(Product: CreateProductDto): Promise<Product>{
        let newProduct =  this.productRepository.create(Product);
        return await this.productRepository.save(newProduct);
    }

    async update(
        id: number,
        product: UpdateProductDto
    ):Promise<Product>{
        let  oldProduct = await this.productRepository.findOneBy({ id });
        oldProduct = { ...oldProduct, ...product };
        return await this.productRepository.save(oldProduct);
    }

    async delete(id: number): Promise<any> {
        return await this.productRepository.delete(id);
    }
    async like(id: number): Promise<Product>{
        let product = await this.findOne(id);
        product.likes++;
        await this.productRepository.save(product);
        return product;
    }
}
