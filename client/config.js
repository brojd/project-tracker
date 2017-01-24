import { ticketStatuses, ticketTypes, locations, positions, skillLevels } from './static_data';

module.exports = {
  API_KEY: 'fake_api_key',
  API_URL: 'http://localhost:9000/api',
  ticketTypes: ticketTypes,
  ticketStatuses: ticketStatuses,
  locations: locations,
  positions: positions,
  skillLevels: skillLevels,
  defaultLocation: {
    Id: 1,
    Name: 'New York'
  },
  defaultPosition: {
    Id: 1,
    Name: 'PM'
  },
  adminId: 756,
  positionPmId: 1
};
