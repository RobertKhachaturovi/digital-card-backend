import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  projectUrl?: string | null;

  @Field(() => String)
  profileId: string;
}
