import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: true })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
  })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  likes: User[];
}
