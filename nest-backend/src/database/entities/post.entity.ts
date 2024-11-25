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
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @ManyToOne(() => User, (user) => user.id)
  author: User;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  comments: Comment[];
  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  likes: User[];
  @Column({ nullable: true })
  image: string;
}
