import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Authenticated = () => {
  return applyDecorators(UseGuards(AuthGuard('jwt-at')), ApiBearerAuth());
};
