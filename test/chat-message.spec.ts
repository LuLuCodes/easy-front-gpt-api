/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-04-28 16:52:40
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-22 19:20:59
 * @FilePath: /easy-front-gpt-api/test/chat-message.spec.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { DataSource } from 'typeorm';
import { OpenAI } from 'langchain/llms/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { SqlDatabaseChain } from 'langchain/chains';

describe('chat message test', () => {
  it('send message', async () => {
    const rawRes = await fetch(
      'http://127.0.0.1:24230/api/chatgpt/chat-message-by-stream',
      {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'hello' }],
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-from-swagger': 'swagger',
        },
      },
    );

    console.log(111111);
    const data = rawRes.body;
    if (!data) {
      throw new Error('no data');
    }

    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;
    let content = '';
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) {
        const char = decoder.decode(value);
        if (char) {
          content = content + char;
        }
      }
      done = readerDone;
    }
    console.log(content);
  }, 1000000);
});
