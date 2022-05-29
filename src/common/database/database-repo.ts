import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import PaginatedResource from '../types/PaginatedResource.interface';
import { omit } from 'underscore';
import { CommonListQueryDto } from '../dtos/pagination.dto';
import mongodbFilterQuerystrings from './filter-querystrings';
import { aggregateQuerystring } from './aggregate-querystring';

export default class DatabaseRepository<ModelRef> {
  constructor(private readonly model: Model<ModelRef>) {}



   /**
   * Get all objects from the database with pagination
   * @param filter - The filter to use to find the resource
   * @param populateOptions
   * @returns Promise<PaginatedResource<ModelRef>>
   */
    async getObjectListPublic(
      query: CommonListQueryDto,
      populateOptions?: any,
    ): Promise<PaginatedResource<ModelRef>> {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const sort = query.sort || '-createdAt';

  
      
  
      const count = await this.model.countDocuments();
  
      const contents = await this.model
        .find()
        .select(query.fields)
        .populate(populateOptions)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);
  
      return {
        currentPage: page,
        pageCount: Math.ceil(count / limit),
        count,
        contents,
      };
    }

  /**
   * Get all objects from the database with pagination
   * @param filter - The filter to use to find the resource
   * @param populateOptions
   * @returns Promise<PaginatedResource<ModelRef>>
   */
  async getObjectList(
    query: CommonListQueryDto,
    findArgs?: FilterQuery<ModelRef>,
    populateOptions?: any,
  ): Promise<PaginatedResource<ModelRef>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const sort = query.sort || '-createdAt';
    const formattedFilterFromQueryString = mongodbFilterQuerystrings(query);
    const formattedAggregateQuerystring = aggregateQuerystring(query);

    

    const count = await this.model.countDocuments({
      ...omit(findArgs, ['filter', 'aggregate']),
      ...formattedFilterFromQueryString,
    });

    const contents = await this.model
      .find({
        ...omit(findArgs, ['filter', 'aggregate']),
        ...formattedFilterFromQueryString,
      })
      .select(query.fields)
      .populate(populateOptions)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      currentPage: page,
      pageCount: Math.ceil(count / limit),
      count,
      contents,
    };
  }

  async getObject(filter?: FilterQuery<ModelRef>, populateOptions?: any) {
    const count = await this.model.countDocuments(filter);
    if (count === 0) throw new NotFoundException('Resource not found');
    return this.model.findOne(filter).populate(populateOptions)
  }

  async updateObject(filter: FilterQuery<ModelRef>, payload: any) {
    const count = await this.model.countDocuments(filter);
    if (count === 0) throw new NotFoundException('Resource not found');
    return this.model.findOneAndUpdate(filter, payload, { new: true });
  }

  async deleteObject(filter: FilterQuery<ModelRef>) {
    const exists = await this.model.exists(filter);
    if (!exists) throw new NotFoundException('Resource not found');
    return await this.model.findOneAndDelete(filter);
  }

  async cascadeDelete(filter?: FilterQuery<ModelRef>){
   const deleteDoc =  await this.model.deleteMany(filter)
   console.log(deleteDoc);
   return deleteDoc;
  }

}
