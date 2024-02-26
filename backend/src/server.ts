// server.ts
// 環境変数をプロセスにロード
import dotenv from 'dotenv';
dotenv.config();

// 必要なモジュールをインポート
import createError from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";

// インポートパスを修正する必要があります
import indexRouter from './routes/index'; 

const app: express.Express = express();

// ミドルウェアの設定
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// ルーターの設定
app.use('/api', indexRouter);

// 404 エラーのハンドリング
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
  });
  
// エラーハンドリング
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // 開発環境でのみエラー詳細を返す
    if (req.app.get('env') === 'development') {
      res.status(err.status || 500).json({ message: err.message, error: err });
    } else {
      res.status(err.status || 500).json({ message: err.message });
    }
  });

// appをエクスポートします
export default app;