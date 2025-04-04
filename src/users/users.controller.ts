import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    findAll() {
        return []
    }

    @Get('interns')
    findAllInterns() {
        return []
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id }
    }

    @Post()
    create(@Body() user: {}) {
    }
}
