import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const pool = await getPool();
