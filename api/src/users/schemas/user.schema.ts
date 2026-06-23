import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  picture: string;

@Prop({
  enum: ['google', 'github'],
  default: 'google',
})
provider: string;

  @Prop({
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @Prop()
  telegramChatId?: string;

  @Prop()
  telegramLinkedAt?: Date;

  @Prop()
  telegramLinkToken?: string;

  @Prop()
  telegramLinkTokenExpiresAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);