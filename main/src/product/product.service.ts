import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDoc } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
// when using id: number we use findone({id})
// when using id: string we use findOneById(id)
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<productDoc>,
        private readonly httpService: HttpService
    ) { }

    async getAll(): Promise<productDoc[]>{ 
        return await this.productModel.find().exec();
    }
    async create(product: CreateProductDto): Promise<productDoc>{
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }
    async getOne(id: number): Promise<productDoc>{
        return await this.productModel.findOne({id}).exec();
    }
    async update(id:number, product: UpdateProductDto): Promise<productDoc>{
    return await this.productModel.findOneAndUpdate({id}, product, {new: true}).exec();
    }
    async delete(id: number): Promise<any>{
        await this.productModel.findOneAndDelete({id}).exec();
        return {message: 'Product deleted successfully'};
    }
    async like(id: number): Promise<productDoc>{
        let product = await this.getOne(id);
        await this.httpService.post(`http://localhost:3000/api/v1/products/${id}/like`, {}).subscribe();
        product.likes++;
        await product.save();
        return product;
    }
}
