// taskStore.js
import create from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  toggleTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, concluida: !task.concluida } : task
      ),
    })),
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));

export default useTaskStore;
