import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { GetInfo } from './slashcommands/GetInfo';
import { IPostRoomUserJoined, IRoomUserJoinedContext } from '@rocket.chat/apps-engine/definition/rooms';

export class UmangwelcomebotApp extends App implements IPostRoomUserJoined {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new GetInfo());
    }

    async executePostRoomUserJoined(context: IRoomUserJoinedContext, read: IRead, http: IHttp, persistence: IPersistence, modify?: IModify | undefined): Promise<void> {
        const username = context.joiningUser.username;
        const room = context.room;
        const response = await http.get(`https://welcome-gen-59cce07ae427.herokuapp.com/welcome/${username}`);

        const {message} = JSON.parse(response.content as string)
        const messageBuilder = modify?.getCreator().startMessage().setRoom(room).setText(message)

        if (messageBuilder) {
            await modify?.getCreator().finish(messageBuilder);
        }
    }
}
