import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Headers,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// @Controller({
//   path: 'user',
//   version: '1',
// })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  // findAll(@Request() req) {
  //   console.log('req', req.query);
  //   return {
  //     code: 200,
  //     message: req.query.name,
  //   };
  // }
  findAll(@Query() query) {
    console.log(query);
    return {
      code: 200,
      message: query.name,
    };
  }

  @Post()
  // create(@Request() req) {
  //   console.log(req.body);
  //   return {
  //     code: 200,
  //     message: req.body.name,
  //   };
  // }
  create(@Body('age') body) {
    console.log(body);
    return {
      code: 200,
      // message: body.name,
    };
  }

  @Get(':id')
  @HttpCode(500)
  // findId(@Request() req) {
  //   console.log(req.params);
  //   return {
  //     code: 200,
  //   };
  // }
  findId(@Param('id') param, @Headers() header) {
    console.log(param);
    console.log(header);
    return {
      code: 200,
    };
  }

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    if (
      req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        code: 200,
        message: '验证码正确',
      };
    } else {
      return {
        code: 200,
        message: '验证码错误',
      };
    }
  }
}
