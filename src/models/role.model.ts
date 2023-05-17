import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { User } from './user.model';

interface RoleAttributes {
  id: number;
  name: string;
  description: string;
};

interface RoleCreationAttributes
  extends Optional<RoleAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: "roles",
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  description!: string;

  @HasMany(() => User)
  users!: User[];
}

// tạo bảng role