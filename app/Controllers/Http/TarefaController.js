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

}

module.exports = TarefaController
