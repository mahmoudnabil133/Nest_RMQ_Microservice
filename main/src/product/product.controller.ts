import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }
    @Get()
    async getAll() {
        return await this.productService.getAll();
    }
    
    // @Post()
    // async create(@Body() product: CreateProductDto){
    @EventPattern('product_created')
    async create(data: CreateProductDto){

        return await this.productService.create(data)
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return await this.productService.getOne(id);
    }
    // @Patch(':id')
    // async updateOne(@Param('id') id: string, @Body() product: UpdateProductDto){
    @EventPattern('product_updated')
    async updateOne(product: UpdateProductDto){
        return await this.productService.update(product.id, product)
    }
    // @Delete(':id')
    // async delete(@Param('id') id: string){
    @EventPattern('product_deleted')
    async delete(id: number){
        return await this.productService.delete(id);
    }
    @EventPattern('hello')
    async handle(data: string){
        console.log(`Received data: ${data}`);
    }

    @Post(':id/like')
    async like(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.like(id);
    }

}
