/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-27 14:33:10
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-03-27 16:30:51
 * @FilePath: /chatgpt-api/src/libs/fetch-sse.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import fetch from 'node-fetch';
import { createParser } from 'eventsource-parser';

export class SseError extends Error {
  statusCode?: number;
  statusText?: string;
  isFinal?: boolean;
  accountId?: string;
}

export async function fetchSSE(url: string, options: any) {
  const { onMessage, ...fetchOptions } = options;
  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    let reason: string;

    try {
      reason = await res.text();
    } catch (err) {
      reason = res.statusText;
    }

    const msg = `fetch sse error ${res.status}: ${reason}`;
    const error = new SseError(msg);
    error.statusCode = res.status;
    error.statusText = res.statusText;
    throw error;
  }

  const parser = createParser((event) => {
    if (event.type === 'event') {
      onMessage(event.data);
    }
  });

  const body: NodeJS.ReadableStream = res.body as any;

  if (!body.on || !body.read) {
    throw new SseError('unsupported "fetch" implementation');
  }

  body.on('readable', () => {
    let chunk: string | Buffer;
    while (null !== (chunk = body.read())) {
      parser.feed(chunk.toString());
    }
  });
}
