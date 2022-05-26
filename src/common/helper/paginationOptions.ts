import { CommonListQueryDto } from '../dtos/pagination.dto';

interface PaginationQueryDefault {
  page: number;
  limit: number;
  sort?: string;
}

const paginationOptions = (
  pagination: CommonListQueryDto,
  defaults: PaginationQueryDefault,
): PaginationQueryDefault => {
  return {
    page: Number(pagination.page) || defaults.page,
    limit: Number(pagination.limit) || defaults.limit,
    sort: pagination.sort || defaults.sort,
  };
};

export default paginationOptions;
