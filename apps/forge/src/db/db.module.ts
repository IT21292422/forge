import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { DATABASE_NAME } from '../users/constants/db.constants';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.ATLAS_URI, {
      dbName: DATABASE_NAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
