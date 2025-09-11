import {
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
import { Contact } from '../contacts/entities/contact.entity';

@WebSocketGateway({
  namespace: '/notifications',
  cors: {
    origin: ['http://localhost:4200', 'https://venadorentacar.com.ar'], // ajustá tus orígenes
    credentials: true,
  },
})
export class NotificationsGateway {
  @WebSocketServer() server!: Server;

  // Se ejecuta cuando se crea un contacto
  @OnEvent('contact.created')
  handleContactCreated(payload: Contact) {
    // Emite a todos los clientes conectados
    this.server.emit('contact:created', {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      created_at: payload.created_at,
    });
  }
}
