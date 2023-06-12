/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-06-09 14:06:08
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-06-09 14:15:30
 * @FilePath: /easy-front-gpt-api/src/modules/db-schema/db-schema.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { ConfigService } from '@nestjs/config';
import { OpenAiModel } from '@config/global';
import { OpenAiService } from '@service/openai.service';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { HttpModule, HttpService } from '@nestjs/axios';

import {
  MySqlConnectDTO,
  GetTableStructureBatchDTO,
  ExecSqlDTO,
} from './db-schema.dto';

@Injectable()
export class DbSchemaService {
  constructor(
    @InjectConnection()
    private sequelize: Sequelize,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private cacheService: CacheService,
    private openAiService: OpenAiService,
  ) {}

  getConnection(db_config) {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      ...db_config,
    });

    return sequelize;
  }

  async testMysqlConnect(requestBody: MySqlConnectDTO): Promise<any> {
    let conn = null;
    try {
      const { db_config } = requestBody;
      conn = this.getConnection(db_config);
      await conn.authenticate();
    } catch (error) {
      throw error;
    } finally {
      if (conn) {
        await conn.close();
        conn = null;
      }
    }
  }

  async getTableName(requestBody: MySqlConnectDTO) {
    let conn = null;
    try {
      const { db_config } = requestBody;
      conn = this.getConnection(db_config);
      const query = `SELECT TABLE_NAME as table_name FROM information_schema.tables WHERE TABLE_SCHEMA=:database AND TABLE_TYPE='BASE TABLE';`;
      const tables_name: any = await conn.query(query, {
        replacements: {
          database: db_config.database,
        },
        type: QueryTypes.SELECT,
        raw: true,
      });
      return tables_name;
    } catch (error) {
      throw error;
    } finally {
      if (conn) {
        await conn.close();
        conn = null;
      }
    }
  }

  async getTableStructureBatch(requestBody: GetTableStructureBatchDTO) {
    let conn = null;
    try {
      const { db_config, table_name_list } = requestBody;
      conn = this.getConnection(db_config);

      const promise = table_name_list.map(async (table_name) => {
        const [rows] = await conn.query(
          `SHOW CREATE TABLE \`${db_config.database}\`.\`${table_name}\`;`,
        );
        if (rows.length < 1) {
          throw new Error('Unexpected number of rows.');
        }
        return { table_name, structure: rows[0]['Create Table'] };
      });
      return await Promise.all(promise);
    } catch (error) {
      throw error;
    } finally {
      if (conn) {
        await conn.close();
        conn = null;
      }
    }
  }

  async execSql(requestBody: ExecSqlDTO) {
    let conn = null;
    try {
      const { db_config, exec_sql } = requestBody;
      conn = this.getConnection(db_config);
      const upper_exec_sql = exec_sql.toUpperCase();
      let sql_type = '';
      if (upper_exec_sql.startsWith(QueryTypes.SELECT)) {
        sql_type = QueryTypes.SELECT;
      } else if (upper_exec_sql.startsWith(QueryTypes.INSERT)) {
        sql_type = QueryTypes.INSERT;
      } else if (upper_exec_sql.startsWith(QueryTypes.UPDATE)) {
        sql_type = QueryTypes.UPDATE;
      } else if (upper_exec_sql.startsWith(QueryTypes.DELETE)) {
        sql_type = QueryTypes.DELETE;
      }
      if (sql_type) {
        return await conn.query(exec_sql, {
          type: sql_type,
          raw: true,
        });
      }
      return await conn.query(exec_sql, {
        raw: true,
      });
    } catch (error) {
      throw error;
    } finally {
      if (conn) {
        await conn.close();
        conn = null;
      }
    }
  }
}
