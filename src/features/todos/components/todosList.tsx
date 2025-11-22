import { useTodoList } from '../hooks/useGetTasks'

export const TodosList = () => {
    const { todoList } = useTodoList({})

    return (
        <div>
            <h1>Todo List</h1>
            <p>Description</p>
            {todoList.map((todo) => (
                <p key={todo.id}>{JSON.stringify(todo)}</p>
            ))}
        </div>
    )
}
