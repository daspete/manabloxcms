import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DateFieldTypeSettingsInput {
  @Field(() => Boolean, { nullable: true })
  useTime?: boolean;

  @Field(() => Date, { nullable: true })
  minDate?: Date;

  @Field(() => Date, { nullable: true })
  maxDate?: Date;

  @Field(() => [Date], { nullable: true })
  excludedDates?: Array<Date>;

  @Field(() => [Date], { nullable: true })
  possibleDates?: Array<Date>;

  @Field(() => Date, { nullable: true })
  defaultValue?: Date;
}
