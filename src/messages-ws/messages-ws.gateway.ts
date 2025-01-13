import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  async onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // Emit only to client
    // client.emit('message-from-server', {
    //   fullName: 'Andres',
    //   message: payload.message || 'no message',
    // });

    // Emit to all except the initial client
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Andres',
    //   message: payload.message || 'no message',
    // });

    this.wss.emit('message-from-server', {
      fullName: 'Andres',
      message: payload.message || 'no message',
    });
  }
}
