

import { User } from '@/api/user/entities/user.entity';
import { index, ModelOptions, plugin, Prop, Ref } from '@typegoose/typegoose';

export class Status {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    issue: string;
}

export class EventDate {
    @Prop({ required: true })
    day: string;

    @Prop({ required: true })
    month: string;

    @Prop({ required: true })
    year: string;
}

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
})

export class Event {

    @Prop({ required: true, trim: true })
    event_name: string;

    @Prop({ required: false, trim: true })
    description: string;

    @Prop({ required: true, trim: true })
    location: string;

    @Prop({ required: true })
    status: Status

    @Prop({ required: true })
    date: EventDate

    @Prop({ ref: () => User, required: true })
    user: Ref<User>;

}
