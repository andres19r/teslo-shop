import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
  [id: string]: Socket;
}

@Injectable()
export class MessagesWsService {
  private connectecClients: ConnectedClients = {};

  registerClient(client: Socket) {
    this.connectecClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectecClients[clientId];
  }

  getConnectedClients(): number {
    return Object.keys(this.connectecClients).length;
  }
}
