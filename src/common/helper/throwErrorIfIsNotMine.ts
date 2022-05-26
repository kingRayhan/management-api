import { ResourceIsNotMineException } from '../exceptions/resource-is-not-mine.exception';

const throwErrorIfIsNotMine = <Model>(resource, userId) => {
  if (resource.user.toString() !== userId)
    throw new ResourceIsNotMineException('This resource is not owned by you');
};

export default throwErrorIfIsNotMine;
