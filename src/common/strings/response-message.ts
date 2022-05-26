import { HttpStatus } from '@nestjs/common';

export enum ResponseMessage {
  UPDATE_SUCCESS = 'Update Successfully!',
  UPDATE_FAILED = 'Update Failed!',

  DELETE_SUCCESS = 'Deleted Successfully!',
  DELETE_FAILED = 'Delete Failed!',
  NOT_VALID = 'Id is not Valid!',

  NOT_FOUND = 'Resource not found!',

  // s3
  S3_UPLOAD_FAILED = 'S3 Upload Failed!',
  S3_UPLOAD_SUCCESS = 'S3 Upload Successfully!',
  S3_DELETE_FAILED = 'S3 Delete Failed!',
  S3_DELETE_SUCCESS = 'S3 Delete Successfully!',

  // Wallet
  WALLET_FERCHED_SUCCESSFULLY = 'Wallet fetched successfully!',
  WALLET_CREATED_SUCCESSFULLY = 'Wallet Created Successfully!',
  WALLET_CREATED_FAILED = 'Wallet Created Failed!',
  WALLET_UPDATED_SUCCESSFULLY = 'Wallet Updated Successfully!',
  WALLET_DELETED_SUCCESSFULLY = 'Wallet Deleted Successfully!',

  // Notification
  NOTIFICATION_SENT_SUCCESSFULLY = 'Notification Sent Successfully!',
  NOTIFICATION_FETCHED_SUCCESSFULLY = 'Notification Fetched Successfully!',

  // article
  ARTICLE_CREATED_SUCCESSFULLY = 'Article Created Successfully!',
  ARTICLE_FETCHED_SUCCESSFULLY = 'Article Fetched Successfully!',
  ARTICLE_UPDATED_SUCCESSFULLY = 'Article Updated Successfully!',
  ARTICLE_DELETED_SUCCESSFULLY = 'Article Deleted Successfully!',

  // video
  VIDEO_CREATED_SUCCESSFULLY = 'Video Created Successfully!',
  VIDEO_FETCHED_SUCCESSFULLY = 'Video Fetched Successfully!',
  VIDEO_UPDATED_SUCCESSFULLY = 'Video Updated Successfully!',
  VIDEO_DELETED_SUCCESSFULLY = 'Video Deleted Successfully!',
  VIDEO_UPLOAD_FAILED = 'Video Upload Failed!',

  // comment
  COMMENT_CREATED_SUCCESSFULLY = 'Comment Created Successfully',
  COMMENT_FETCHED_SUCCESSFULLY = 'Comment Fetched Successfully!',
  COMMENT_UPDATED_SUCCESSFULLY = 'Comment Updated Successfully!',
  COMMENT_DELETED_SUCCESSFULLY = 'Comment Deleted Successfully!',

  // audio
  AUDIO_CREATED_SUCCESSFULLY = 'Audio Created Successfully',
  AUDIO_FETCHED_SUCCESSFULLY = 'Audio Fetched Successfully!',
  AUDIO_UPDATED_SUCCESSFULLY = 'Audio Updated Successfully!',
  AUDIO_DELETED_SUCCESSFULLY = 'Audio Deleted Successfully!',

  // user
  USER_CREATED_SUCCESSFULLY = 'User Created Successfully',
  USER_FETCHED_SUCCESSFULLY = 'User Fetched Successfully!',
  USER_UPDATED_SUCCESSFULLY = 'User Updated Successfully!',
  USER_DELETED_SUCCESSFULLY = 'User Deleted Successfully!',

  // category
  CATEGORY_CREATED_SUCCESSFULLY = 'Category Created Successfully!',
  CATEGORY_FETCHED_SUCCESSFULLY = 'Category Fetched Successfully!',
  CATEGORY_UPDATED_SUCCESSFULLY = 'Category Updated Successfully!',
  CATEGORY_DELETED_SUCCESSFULLY = 'Category Deleted Successfully!',

  // interest
  INTEREST_CREATED_SUCCESSFULLY = 'Interest Created Successfully!',
  INTEREST_FETCHED_SUCCESSFULLY = 'Interest Fetched Successfully!',
  INTEREST_UPDATED_SUCCESSFULLY = 'Interest Updated Successfully!',
  SEARCH_TERM_REMOVED_FROM_HISTORY_SUCCESSFULLY = 'Search Term Removed From History Successfully!',
}
