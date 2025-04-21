import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERROLE } from './enums/user.enums';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "Hammad Ur Rehman",
            email: "hammadurrehman1954@gmail.com",
            role: "ENGINEER"
        },
        {
            id: 2,
            name: "Rafay Ahmed",
            email: "rafayahmed@gmail.com",
            role: "INTERN"
        },
        {
            id: 3,
            name: "Faiz Khan",
            email: "faizkhan18@gmail.com",
            role: "ADMIN"
        },
        {
            id: 4,
            name: "Hasan Ali",
            email: "hasanali2@gmail.com",
            role: "ADMIN"
        },
        {
            id: 5,
            name: "Shahmeer Abbas",
            email: "shahmeerabbas232@gmail.com",
            role: "ENGINEER"
        },
    ]

    findAll(role?: USERROLE) {
        if (role) {
            const usersWithRole = this.users.filter((user) => user.role === role);
            if (usersWithRole.length === 0) throw new NotFoundException(`Users with ${role} role are not found`)
            return usersWithRole
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);

        if (!user) throw new NotFoundException("User Not Found")
        return user

    }

    create(user: CreateUserDTO) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter((user) => user.id !== id)
        return removedUser;
    }
}   
