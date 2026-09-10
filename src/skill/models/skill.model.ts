import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  profileId: string;
}
