import { mount } from '@vue/test-utils'
import TaskManager from '@/components/TaskManager.vue'
import api from '@/services/api'

jest.mock('@/services/api')

const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', done: false, dueDate: '2024-01-15' },
    { id: 2, title: 'Task 2', description: 'Description 2', done: true, dueDate: '2024-06-28' }
]

describe('TaskManager.vue', () => {
    let wrapper

    beforeEach(() => {
        api.getTasks.mockResolvedValue({ data: mockTasks })
        wrapper = mount(TaskManager)
    })

    it('fetches tasks on mount', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.tasks).toEqual(mockTasks)
    })

    it('filters tasks correctly', async () => {
        await wrapper.vm.$nextTick()
        wrapper.find('.filter-button:nth-child(2)').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.filteredTasks).toEqual([mockTasks[1]])

        wrapper.find('.filter-button:nth-child(3)').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.filteredTasks).toEqual([mockTasks[0]])

        wrapper.find('.filter-button:nth-child(1)').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.filteredTasks).toEqual(mockTasks)
    })

    it('toggles task status', async () => {
        await wrapper.vm.$nextTick()
        const task = wrapper.vm.tasks[0]
        wrapper.find('.task-card button').trigger('click')
        expect(api.updateTask).toHaveBeenCalledWith(task.id, { ...task, done: !task.done })
    })

    it('creates a new task', async () => {
        const newTask = { title: 'New Task', description: 'New Description', dueDate: '2024-12-31' }
        wrapper.setData({ newTask })
        wrapper.find('.new-task-form button').trigger('click')
        expect(api.createTask).toHaveBeenCalledWith({ ...newTask, done: false })
    })

    it('edits an existing task', async () => {
        await wrapper.vm.$nextTick()
        const task = wrapper.vm.tasks[0]
        wrapper.find('.task-card button:nth-child(2)').trigger('click')
        expect(wrapper.vm.isEditing).toBe(true)
        expect(wrapper.vm.newTask).toEqual(task)
    })

    it('deletes a task', async () => {
        await wrapper.vm.$nextTick()
        const taskId = wrapper.vm.tasks[0].id
        wrapper.find('.task-card button:nth-child(3)').trigger('click')
        expect(api.deleteTask).toHaveBeenCalledWith(taskId)
    })
})
