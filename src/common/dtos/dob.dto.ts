import { ApiProperty } from "@nestjs/swagger"

export class DOB {

    @ApiProperty()
    day: number
  
    @ApiProperty()
    month: number
  
    @ApiProperty()
    year: number
  
  }