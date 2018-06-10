export class MessageModalService {
    title = '';
    message = '';

    setTitle(title: string) {
        this.title = title;
    }

    setMessage(message: string) {
        this.message = message;
    }
}