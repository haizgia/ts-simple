import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { Book } from './book.model';

interface AuthorAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

interface AuthorCreationAttributes
  extends Optional<AuthorAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: "author",
})
export class Author extends Model<AuthorAttributes, AuthorCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @HasMany(() => Book)
  books!: Book[];
}

// tạo bảng role