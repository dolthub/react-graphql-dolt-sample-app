import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DoltBranches {
  @PrimaryColumn()
  name: string;

  @Column()
  hash: string;

  @Column()
  latest_committer: string;

  @Column()
  latest_committer_email: string;

  @Column()
  latest_commit_message: string;

  @Column()
  latest_commit_date: Date;
}
