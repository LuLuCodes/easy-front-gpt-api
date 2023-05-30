import { Module, Global } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  TAccount,
  TConversation,
  TConversationMessage,
  TDbConfig,
  TOpenaiKey,
} from '@models/index';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
      TAccount,
      TConversation,
      TConversationMessage,
      TDbConfig,
      TOpenaiKey,
    ]),
  ],
  exports: [SequelizeModule],
  controllers: [],
  providers: [],
})
export class DBModule {}
