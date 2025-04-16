'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface FormContextType {
	formData: Record<string, any>
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSave: () => void
	isDirty: boolean
	dirtyFields: Set<string>
	findDiff: () => Record<string, any>
	autosave: boolean
	toggleAutosave: () => void
}

const FormContext = createContext<FormContextType | null>(null)

const FormProvider = ({ children }: { children: React.ReactNode }) => {
	const [formData, setFormData] = useState<Record<string, any>>({})
	const [savedFormData, setSavedFormData] = useState<Record<string, any>>({})
	const [dirtyFields, setDirtyFields] = useState(new Set<string>())
	const [autosave, setAutosave] = useState(false)

	//   do implement redo and undo
    /*
        
    */

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setFormData((prev) => {
			const newData = { ...prev, [name]: value }

			if (savedFormData[name] !== value) {
				setDirtyFields((prevFields) => new Set(prevFields).add(name))
			} else {
				setDirtyFields((prevFields) => {
					const newFields = new Set(prevFields)
					newFields.delete(name)
					return newFields
				})
			}

			return newData
		})
	}

	const handleSave = () => {
		setSavedFormData(formData)
		setDirtyFields(new Set())
	}

	const findDiff = () => {
		const diff: Record<string, any> = {}
		dirtyFields.forEach((field) => {
			diff[field] = formData[field]
		})
		return diff
	}

	const toggleAutosave = () => {
		setAutosave((prev) => !prev)
	}

	useEffect(() => {
		if (autosave && dirtyFields.size > 0) {
			handleSave()
		}
	}, [autosave, formData])

	return (
		<FormContext.Provider
			value={{
				formData,
				handleChange,
				handleSave,
				isDirty: dirtyFields.size > 0,
				dirtyFields,
				findDiff,
				autosave,
				toggleAutosave
			}}>
			{children}
		</FormContext.Provider>
	)
}

export { FormContext, FormProvider }

export const useFormContext = () => {
	const context = useContext(FormContext)
	if (!context) {
		throw new Error('useFormContext must be used within a FormProvider')
	}
	return context
}
