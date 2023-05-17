import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { Author } from './author.model';

interface BookAttributes {
  id: number;
  title: string;
  numberOfPages: number;
  authorId: number;
}

interface BookCreationAttributes
  extends Optional<BookAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: "books",
})
export class Book extends Model<BookAttributes, BookCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  numberOfPages!: number;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId!: number;

  @BelongsTo(() => Author)
  author!: Author;
}