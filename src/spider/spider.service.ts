import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  findAll() {
    const getCosPlay = async () => {
      const body = await axios.get('https://www.jpmn5.com/Cosplay/Cosplay10772.html').then(res => res.data)
      console.log('body', body);
      const $ = cheerio.load(body);
    };
    getCosPlay();
    console.log(222);
    return `This action returns all spider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
}
