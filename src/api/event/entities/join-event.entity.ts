

import { User } from '@/api/user/entities/user.entity';
import { index, ModelOptions, plugin, Prop, Ref } from '@typegoose/typegoose';
import { Event } from './event.entity';


@ModelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
})

export class JoinEvent {

    // @Prop({ ref: () => Event, required: true })
    // event: Ref<Event>;

    // @Prop({ ref: () => User, required: true })
    // user: Ref<User>;
    @Prop({ required: true, trim: true })
    email: string;

    @Prop({ required: true, trim: true })
    phone: string;

    @Prop({ required: true, trim: true })
    first_name: string;

    @Prop({ required: false, trim: true })
    last_name: string;

    @Prop({ required: true, trim: true })
    age: string;

    @Prop({ required: true, trim: true })
    type: string;

}
