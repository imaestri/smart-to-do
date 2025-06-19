import { IsOptional, IsBooleanString } from "class-validator";

export class GetTasksFilterDto {
  @IsOptional()
  @IsBooleanString({ message: "done must be true or false" })
  done?: string;
}
