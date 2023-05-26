import { Table, Model, Column, DataType, PrimaryKey } from "sequelize-typescript";

export interface UserAttributes {
  id: number;
  email: string,
//   role: string,
  typeLogin: string,
  tokenLogin: string,
  name: string,
  avatarUrl: string,
}

@Table({
    timestamps: true,
    tableName: 'user_oauth',
})
export class User extends Model<UserAttributes> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;
    
    @Column({
        type: DataType.STRING,
        defaultValue: 'user'
    })
    role!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    typeLogin!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    tokenLogin!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    avatarUrl!: string;
}