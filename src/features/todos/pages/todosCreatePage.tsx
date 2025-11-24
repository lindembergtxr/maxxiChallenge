import { TodosForm } from '../components/todosForm'

export const TodosCreatePage = () => {
    const updateForm = (data: any) => {
        console.log(data, 'update')
    }
    const submitForm = (data: any) => {
        console.log(data, 'submit')
    }

    return <TodosForm onSubmit={submitForm} canUpdate onChange={updateForm} />
}
