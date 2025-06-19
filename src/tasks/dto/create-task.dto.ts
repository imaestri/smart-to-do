import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({ message: "Title is required" })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  done: boolean;
}
