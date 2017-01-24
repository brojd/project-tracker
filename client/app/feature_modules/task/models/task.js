const today = new Date();

const task = {
  Name: '',
  Project: { Name: '' },
  Status: { Name: ''},
  TicketType: { Name: '' },
  Reporter: { FullName: '', Name: '' },
  Responsible: { FullName: '', Name: '' },
  StartDate: today,
  EndDate: today
};

export default task;
