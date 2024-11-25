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
  @ManyToOne(() => Post, (post) => post.id)
  post: Post;
  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: true })
  parentComment: Comment;
  @OneToMany(() => Comment, (comment) => comment.parentComment.id, {
    cascade: true,
    nullable: true,
  })
  comments: Comment[];
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  likes: User[];
}
