import { json } from 'body-parser';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserAddModel, UserViewModel, UserModel} from '../models/user.model'

export class UserService {
  private readonly _saltRounds = 12
  readonly _jwtSecret  = '0.rfyj3n9nzh'

  static get userAttributes() {
    return ['id', 'email', 'roleId']
  }

  private static _user:any
  static get user() {
    return UserService._user
  }

  register({email, password, roleId} :UserAddModel) {
    return bcrypt.hash(password, this._saltRounds)
      .then(async (hash) => {
        
        const response = await User.findOrCreate({
          where: {email},
          defaults : {
            email,
            password: hash,
            roleId: roleId
          }
        })

        const data: any = response[1] ? await User.findByPk(response[0].id, {
          attributes: UserService.userAttributes
        }): null
        const access_token: string = response[1] ? jwt.sign({
          id: data.id,
          email: data.email,
          roleId: data.roleId
        }, this._jwtSecret) : ''
        
        return {
          error: response[1] ? 0 : 1,
          message: response[1] ? 'Register is successfully' : 'Email is used',
          data: data,
          access_token
        }
      })
  }

  login({email, password} :UserAddModel) {
    return User.findOne({where: {email}})
      .then(async (user) => {
        const isChecked = user && bcrypt.compareSync(password, user.password)
        
        if (isChecked) {
          const {id, email, roleId} = user!
          return {
            error: 0,
            statusCode: 200,
            message: 'Login is successfully',
            data: {id, email, roleId},
            access_token: jwt.sign({id, email, roleId}, this._jwtSecret)
          }
        }
        return {
          err: 1,
          statusCode: 500,
          message: 'Login is unsuccessfully',
        }
      })
  }

  // verifyToken(token: string) {
  //   return new Promise((resolve, reject) => {
  //     jwt.verify(token, this._jwtSecret, (err, value) => {
  //       if (err) {
  //         resolve({
  //           err: 1,
  //           statusCode: 401,
  //           message: 'Invalid token!',
  //         });
  //         return
  //       }
        

  //       // UserService._user = User.findByPk(user['id'])
  //       resolve(true)
  //       return
  //     })
  //   })
  // }

  getUserById(id: any) {
    return new Promise(async (resolve, reject) => {
      try {
          const todos = await User.findByPk(id, {
            attributes: UserService.userAttributes
          });
      
          resolve(todos)
      } catch (error) {
          reject(error);
      }
    })
  }
}