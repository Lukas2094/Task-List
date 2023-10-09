import React from 'react';
import { useForm } from 'react-hook-form';
import { z , string } from 'zod';
import useTaskStore from '../../functions/taskStore';
import './style.css';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsBackspace , BsTrash} from 'react-icons/bs';

const taskSchema = z.object({
    texto: string(),
  });

function TaskList() {
  const { tasks, addTask, removeTask, toggleTask, filter, setFilter } = useTaskStore();
  const { register, handleSubmit, reset } = useForm();

  const filteredTasks = tasks.filter((task) =>
    filter === 'completed' ? task.concluida : filter === 'incompleted' ? !task.concluida : true
  );

  const onSubmit = (data) => {
    try {
      taskSchema.parse(data);
  
      const currentDate = new Date(); // Obtém a data e hora atuais
      const newTask = {
        id: Date.now().toString(),
        texto: data.texto,
        concluida: false,
        dataCriacao: currentDate, // Adiciona a data de criação à tarefa
      };
  
      addTask(newTask);
      reset();
    } catch (error) {
      console.error('Erro de validação:', error.message);
    }
  }

  const filterCheck = filteredTasks.filter((item) => item.concluida === true)
  // console.log(filteredTasks);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Task List</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Criar Tarefa</label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register('texto', { required: true })}
            placeholder="Digite sua tarefa..."
            className="w-full border rounded-md"
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            <GrAddCircle className='iconAdd'/>
          </button>
        </form>
      </div>
      <div className="mb-5">
        <label className="block font-medium">Filtrar Tarefas</label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="border p-2"
        >
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="incompleted">Não Concluídas</option>
        </select>
      </div>
      <ul>
            
        {filteredTasks.map((task) => (
          <li key={task.id} className={` mb-2`}>
            <span className={task.concluida ? 'line-through' : ''}>{task.texto}</span>
            <p className="text-xs text-gray-500">Criado em: {task.dataCriacao.toLocaleString()}</p>
            <div className='content-buttons'>
              <button
                onClick={() => toggleTask(task.id)}
                className={`${
                  task.concluida ? 'mr-4' : 'mr-2'
                } hover:text-green-700 focus:outline-none`}
              >
                {task.concluida ? <BsBackspace /> : <AiOutlineCheck />}
              </button>
              <button
                onClick={() => removeTask(task.id)}
                className="red text-red-500 hover:text-red-700 focus:outline-none"
              >
                <BsTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <div style={{float: 'initial', width: '20%'}}>
        <label className="block font-medium">Tarefas Concluídas</label>
          <ul style={{width: '100%'}} className={`${filterCheck.length === 0 ? 'none' : 'flex'}`}>
            {filterCheck.map((task) => (
              <li key={task.id} className={`mb-2`}>
                <span className={task.concluida ? 'line-through' : ''}>{task.texto}</span>
                <div className='content-buttons'>
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`${
                      task.concluida ? 'mr-4' : 'mr-2'
                    } hover:text-green-700 focus:outline-none`}
                  >
                    {task.concluida ? <BsBackspace /> : <AiOutlineCheck />}
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="red text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <BsTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>

      </div>

    </div>
  );
}

export default TaskList;
