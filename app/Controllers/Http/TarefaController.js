'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tarefas
 */
const Tarefa = use('App/Models/Tarefa')
const Database = use('Database')

class TarefaController {


  async store ({ request, response, auth }) {
    const {id} = auth.user

    const data = request.only(['titulo', 'descricao'])

    const tarefa = await Tarefa.create({...data, user_id: id})

    return tarefa
  }

  async index({ request, response, view, auth }){
    //Pega todas as tarefas
    //const tarefa = await Tarefa.all()
    
    //Tefas do usuário pesquisado
    //const tarefa = await Tarefa.query().where('user_id', auth.user.id).fetch()

    const tarefa = Database.select('titulo', 'descricao').from('tarefas')
    .where('user_id', auth.user.id)
    return tarefa
  }
  
  async show({ params, request, response, auth }){
    const tarefa = await Tarefa.query().where('id', params.id)
    .where('user_id', '=', auth.user.id).first()
  
    if(!tarefa){
      return response.status(404).send({message: 'Nenhum registro localizado'})
    }
  
    return tarefa
  }

  async update({params, request, response, auth}){
    const  {titulo, descricao} = request.all()

    const tarefa = await Tarefa.query().where('id', params.id)
    .where('user_id', '=', auth.user.id).first()

    if(!tarefa){
      return response.status(404).send({message: 'Nenhum registro localizado'})
    }

    tarefa.titulo = titulo
    tarefa.descricao = descricao
    tarefa.id = params.id

    await tarefa.save()

    return tarefa
  }

  async destroy({ params, request, response, auth }){
    const  {titulo, descricao} = request.all()

    const tarefa = await Tarefa.query().where('id', params.id)
    .where('user_id', '=', auth.user.id).first()

    if(!tarefa){
      return response.status(404).send({message: 'Nenhum registro localizado'})
    }

    await tarefa.delete()
    response.status(200).send({message:'Registro removido'})
  }

}


module.exports = TarefaController
