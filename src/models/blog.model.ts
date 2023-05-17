import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { User } from "./user.model";

interface BlogAttributes {
  id: number;
  authorId: number;
  title: string;
  image: string;
  content: string;
  display: boolean;
}

interface BlogCreationAttributes extends Optional<BlogAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "blogs",
})
export class Blog extends Model<BlogAttributes, BlogCreationAttributes> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  display!: boolean;

  @BelongsTo(() => User)
  user!: User;
}
