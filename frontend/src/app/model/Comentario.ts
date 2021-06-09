import { User } from './User';
import { Produto } from './Produto';

export class Comentario{
  public id: number
  public texto: string
  public produto: Produto
  public usuario: User
}