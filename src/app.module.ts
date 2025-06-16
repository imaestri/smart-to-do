import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('tasks');
  }
}
