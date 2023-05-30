/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-22 19:38:56
 * @FilePath: /easy-front-gpt-api/test/http.service.spec.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Test } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';

describe.skip('CatsController', () => {
  let httpService: HttpService;
  const client_id = '68914c2df131f2b9';
  const base_url = 'http://api.vv-tool.com';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    httpService = moduleRef.get<HttpService>(HttpService);
  });

  const getToken = async () => {
    const url = `https://hongyun-tool-service.xitie10.com/api/open/get-vtool-token`;
    const res_data = await httpService.axiosRef.post(
      url,
      {
        appkey: client_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 25000,
      },
    );
    const { code, data, msg } = res_data.data;
    if (code !== 0) {
      throw new Error(msg);
    }
    return data;
  };

  const getGoodsDetail = async ({ goods_id, token }): Promise<any> => {
    const url = `${base_url}/tool/accounts/item-info-low-price?url=${goods_id}`;
    const res_data = await httpService.axiosRef.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      timeout: 25000,
    });
    const { code, data, msg } = res_data.data;
    if (code !== 0) {
      throw new Error(msg);
    }
    if (msg === '商品不存在') {
      return null;
    }
    return data;
  };

  describe('vTools', () => {
    it('getGoodsDetail', async () => {
      const token = await getToken();
      const data = await getGoodsDetail({ goods_id: '562231266281', token });
      console.log(data);
    });
  });
});
