import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  position: string;

  @Field(() => String)
  period: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  profileId: string;
}
