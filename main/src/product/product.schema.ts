import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Product{

    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    image: string;

    @Prop()
    likes: number;
}
export type productDoc = HydratedDocument<Product>; 
export const ProductSchema = SchemaFactory.createForClass(Product);