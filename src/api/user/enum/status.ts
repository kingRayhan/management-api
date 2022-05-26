enum status_type {
  'PENDING',
  'VERIFIED',
  'REJECTED',
}

interface IStatus {
  type: status_type;
  value: string;
}
