import { IRead, IModify, IHttp, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class GetInfo implements ISlashCommand {
    public command = 'umang-getinfo';
    public i18nParamsExample = 'getinfo';
    public i18nDescription = 'Get information about the app';
    public providesPreview = false;

    async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const room = context.getRoom();
        const messageBuilder = modify.getCreator()
            .startMessage()
            .setRoom(room)
            .setText(
                `Describe Rocket.Chat Apps Engine: https://developer.rocket.chat/apps-engine/rocket.chat-apps-engine`
            );

            await modify.getCreator().finish(messageBuilder);
    }
}
