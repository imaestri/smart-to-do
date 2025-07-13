import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetTasksFilterDto } from "./dto/get-task.dto";
import { supabase } from "../supabase/supabase.client";

@Injectable()
export class TasksService {
  private readonly table = "tasks";

  async findAll(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { done } = filterDto;
    let query = supabase.from(this.table).select("*");
    if (done !== undefined) {
      query = query.eq("done", done === "true");
    }
    const result = await query;
    if (result.error) throw new Error(result.error.message);
    return result.data as Task[];
  }

  async findOne(id: number): Promise<Task> {
    const result = await supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();
    if (result.error || !result.data) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return result.data as Task;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const result = await supabase
      .from(this.table)
      .insert([{ ...dto }])
      .select()
      .single();
    console.log(result);
    if (result.error) throw new Error(result.error.message);
    return result.data as Task;
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id);
    const result = await supabase
      .from(this.table)
      .update({ ...dto })
      .eq("id", id)
      .select()
      .single();
    if (result.error) throw new Error(result.error.message);
    return result.data as Task;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const result = await supabase.from(this.table).delete().eq("id", id);
    if (result.error) throw new Error(result.error.message);
  }
}
