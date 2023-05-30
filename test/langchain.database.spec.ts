/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-04-28 16:52:40
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-04-28 17:37:06
 * @FilePath: /easy-front-gpt-api/test/langchain.database.spec.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { DataSource } from 'typeorm';
import { OpenAI } from 'langchain/llms/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { SqlDatabaseChain } from 'langchain/chains';

describe.skip('langchain database test', () => {
  it('mysql', async () => {
    const datasource = new DataSource({
      type: 'mysql',
      host: '81.69.225.47',
      port: 4306,
      username: 'root',
      password: 'Myun@123jx',
      database: 'code_gpt_db',
    });

    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: datasource,
    });

    const chain = new SqlDatabaseChain({
      llm: new OpenAI({
        openAIApiKey: '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',
        temperature: 0,
      }),
      database: db,
    });

    const res = await chain.run('How many tables in this database?');
    console.log(res);
  }, 1000000);
});
