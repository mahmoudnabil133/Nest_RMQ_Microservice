import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ) {}

    @Get()
    async getAll() {
        return  await this.productService.findAll();
    }
    @Get(':id')
    async getOne(@Param('id',ParseIntPipe) id:number){
        return  await this.productService.findOne(id);
    }
    @Post()
    async create(@Body() product: CreateProductDto){
        const newProduct = await this.productService.create(product);
        this.client.emit('product_created', newProduct);
        return newProduct;
    }
    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id:number, @Body() product: UpdateProductDto){
        const updatedProduct = await this.productService.update(id, product);
        this.client.emit('product_updated', updatedProduct);
        return updatedProduct;
    }
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number){
        const product = await this.productService.delete(id);
        this.client.emit('product_deleted', id);
    }
    
    @Post(':id/like')
    async like(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.like(id);
    }

    
}
