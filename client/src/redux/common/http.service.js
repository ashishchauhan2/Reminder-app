import axios from 'axios';
import { Config }from '../../config/environment';

export const http = axios.create({
    baseURL: Config.API,
    errorHandler: false,
  });