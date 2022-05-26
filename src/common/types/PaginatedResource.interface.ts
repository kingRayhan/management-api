export default interface PaginatedResource<Resource> {
  currentPage: number;
  pageCount: number;
  count: number;
  contents: Resource[];
}
