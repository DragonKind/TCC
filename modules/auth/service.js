import * as userRepository from '../users/repository';
import * as clientRepository from '../clients/repository';
import { saltHashPassword, compare } from '../../services/crypto';
import * as jwt from 'jsonwebtoken';
import config from '../../config'

/**
 * Function to authenticate users in the system 
 * @param { Request } ctx HTTP context, request and response objescts into a single object.
 * @param { Function } next Executes the next middleware function.
 * @returns Acesss Token and confirmation
 */
export async function authUser (ctx, next) {
  const user = await userRepository.findByUsername(ctx.request.body.username);
    if(!await compare(ctx.request.body.password, user))
      ctx.throw(401,'User not authorized');
    let token = jwt.sign({ id: user.usuario_id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    ctx.status = 200;
    ctx.body = { auth: true, token: token };
}

/**
 * Function to authenticate clients in the system 
 * @param { Request } ctx HTTP context, request and response objescts into a single object.
 * @param { Function } next Executes the next middleware function.
 * @returns Acesss Token and confirmation
 */
export async function authClient (ctx, next) {
  const client = await clientRepository.findByUsername(ctx.request.body.username);
  if(!await compare(ctx.request.body.password, user))
    ctx.throw(401,'User not authorized');
  let token = jwt.sign({ id: client.usuario_id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  ctx.status = 200;
  ctx.body = { auth: true, token: token };
}
