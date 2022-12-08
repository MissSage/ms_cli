#!/usr/bin/env node

// 将构建目录(lib)下的 index.js 作为脚手架的入口
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('../lib/index');
