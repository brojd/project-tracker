import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'openedTickets' })
export class OpenedTicketsPipe implements PipeTransform {
  transform(allTickets) {
    return allTickets.filter(ticket => ticket.StatusId !== 5);
  }
}
