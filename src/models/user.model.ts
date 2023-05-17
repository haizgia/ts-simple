import { Table, Model, Column, DataType, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
// import { Optional } from 'sequelize';
import { Role } from "./role.model";
import { Blog } from './blog.model';

export interface UserAddModel {
    email: string;
    password: string;
    roleId: number;
}

export interface UserViewModel {
    id: number;
    email: string;
    roleId: number;
}

export interface UserModel extends Model<UserAddModel, UserModel> {
    id: number;
    email: string;
    password: string;
    roleId: number;
}

@Table({
    timestamps: true,
    tableName: 'user2s',
})
export class User extends Model<UserModel, UserAddModel> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 2
    })
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role;

    @HasMany(() => Blog)
    blogs!: Blog[];
}