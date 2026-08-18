import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100_000_000)
  price?: number
}
