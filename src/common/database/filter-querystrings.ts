import { ForbiddenException } from '@nestjs/common';

const allowedOperators = [
  // comparison
  'eq',
  'ne',
  'in',
  'nin',
  'gt',
  'gte',
  'lt',
  'lte',
  // element
  'exists',
  // array
  'all',
  'size',
];

const parseSingleQuerystring = (querystring: string) => {
  const [field, rest] = querystring.split(':');
  const [operator, value] = rest.split('=');

  if (!allowedOperators.includes(operator)) {
    throw new ForbiddenException(`Operator ${operator} is not valid`);
  }

  if (operator == 'in' || operator == 'nin' || operator == 'all') {
    const values = value.split(',');
    return { [field]: { [`$${operator}`]: values } };
  }

  return {
    [field]: { [`$${operator}`]: value },
  };
};

const mongodbFilterQuerystrings = (querystrings: any) => {
  try {
    if (!querystrings['filter']) return undefined;

    const fields = querystrings['filter'].split(';');
    const filter = fields.reduce((acc: {}, field: string) => {
      const parsed = parseSingleQuerystring(field);
      return { ...acc, ...parsed };
    }, {});

    return filter;
  } catch (error) {
    throw new ForbiddenException(
      'Invalid filter querystring. See documentation',
    );
  }
};

export default mongodbFilterQuerystrings;
