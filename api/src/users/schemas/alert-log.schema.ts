import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AlertLogDocument = HydratedDocument<AlertLog>;

@Schema({ timestamps: true })
export class AlertLog {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  message: string;
}

export const AlertLogSchema =
  SchemaFactory.createForClass(AlertLog);