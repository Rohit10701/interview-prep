'use client'
import { useState } from 'react'

type TodoType = {
	id: number
	title: string
	description?: string
	status: StatusType
	createdAt: Date
	updatedAt: Date
}

const enum StatusType {
	Pending = 'pending',
	Completed = 'completed'
}

const Todos = () => {
	const [todos, setTodos] = useState<TodoType[]>([])
	const [oldTodos, setOldTodos] = useState<TodoType[]>([])

	const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const title = formData.get('title') as string
		const description = formData.get('description') as string

		if (!title.trim() || !description.trim()) return

		const todo: TodoType = {
			id: oldTodos.length > 0 ? oldTodos[oldTodos.length - 1].id + 1 : 0,
			title,
			description,
			status: StatusType.Pending,
			createdAt: new Date(),
			updatedAt: new Date()
		}

		setTodos([...oldTodos, todo])
		setOldTodos([...oldTodos, todo])

		e.currentTarget.reset()
	}

	const handleDeleteTodo = (id: number) => {
		const filteredTodos = oldTodos.filter((todo) => todo.id !== id)
		setTodos(filteredTodos)
		setOldTodos(filteredTodos)
	}

	const handleSearchTodos = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchQuery = e.target.value
		const filteredTodods = oldTodos.filter((todo) => todo.title.indexOf(searchQuery) >= 0)
		setTodos(filteredTodods)
	}

	const toggoleTodoStatus = (id: number) => {
		const todoToBeEdited = oldTodos.find((todo) => todo.id === id)
		const remainingOldTodo = oldTodos.filter((todo) => todo.id !== id)
		const remainingTodods = todos.filter((todo) => todo.id !== id)
		if (!todoToBeEdited) return
		const editedTodo: TodoType = {
			...todoToBeEdited,
			status:
				todoToBeEdited?.status === StatusType.Pending ? StatusType.Completed : StatusType.Pending,
			updatedAt: new Date()
		}
		setOldTodos([...remainingOldTodo, editedTodo])
		setTodos([...remainingTodods, editedTodo])
	}

	console.log({ todos, oldTodos })
	return (
		<>
			<input
				name='search'
				type='search'
				placeholder='search for todos'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchTodos(e)}
			/>
			<button
				type='button'
				onClick={() => {
					setTodos(oldTodos)
				}}>
				Clear Completed
			</button>
			<form onSubmit={handleAddTodo}>
				<input
					name='title'
					type='text'
					placeholder='Title'
				/>
				<input
					name='description'
					type='text'
					placeholder='Description'
				/>
				<button type='submit'>Add Todo</button>
			</form>
			{todos.map((todo) => (
				<div key={todo.id}>
					<span>
						{todo.title}
						{todo.description && <span>{todo.description}</span>}
						<button
							onClick={() => toggoleTodoStatus(todo.id)}
							type='button'>
							{todo.status === 'pending' && <span>Pending</span>}
							{todo.status === 'completed' && <span>Completed</span>}
						</button>
					</span>
					<button
						type='button'
						onClick={() => handleDeleteTodo(todo.id)}>
						Delete
					</button>
				</div>
			))}
		</>
	)
}

export default Todos
