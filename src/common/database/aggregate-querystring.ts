import { ForbiddenException } from '@nestjs/common';

const parseSingleAggregation = (aggregation: string) => {
  try {
    const [path, columns] = aggregation.split(':');
    return { path, select: columns.split(',').join(' ') };
  } catch (error) {
    throw new ForbiddenException('Invalid aggregation querystring.');
  }
};

export const aggregateQuerystring = (queryStrings: any) => {
  // aggregate=user:id,name,email;categories:id,name
  if (!queryStrings['aggregate']) return undefined;
  const fields = queryStrings['aggregate'].split(';');
  return fields.map(parseSingleAggregation);
};
