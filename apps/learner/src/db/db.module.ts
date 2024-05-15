import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.ATLAS_URI, {
      dbName: "forge_test",
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
