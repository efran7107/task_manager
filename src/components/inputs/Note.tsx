import {TNote} from "../../types/globalTypes.ts";
import {ChangeEvent, useState} from "react";
import {isCompletedTask} from "../../functions/validations.ts";
import {getDate} from "../../functions/functions.ts";
import {UserInput} from "./userInput.tsx";

export const NoteInput = ({
  notes,
	setNotes
}: {
	notes: Omit<TNote, 'id' | 'taskId' | 'authId'>[],
	setNotes: (notes : Omit<TNote, 'id' | 'taskId' | 'authId'>[]) => void
}) => {
	const [createNote, setCreateNote] = useState<Omit<TNote, 'id' | 'taskId' | 'authId'>>({
		title: '',
		desc: '',
		date: getDate()
	})
	
	const editNote = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		const key = e.currentTarget.id
		const value = e.currentTarget.value
		setCreateNote({...createNote, [key]: value})
	}
	
	return (
		<form
			className='note-cont'
			onSubmit={(e) => {
				const {title, desc} = createNote
				e.preventDefault()
				if(!isCompletedTask({title: title, desc: desc})) return
				setNotes([...notes, createNote])
				setCreateNote({
					title: '',
					desc: '',
					date: getDate()
				})
			}
		}
		>
			<UserInput id='title' curKey='title' label='Title' userInput={{
				onChange: editNote
			}}/>
			<div className="user-desc-cont note-input">
				<label htmlFor="desc">Description: </label>
				<textarea name="desc" id="desc" onChange={editNote}></textarea>
			</div>
			<input type="submit" value="Submit"/>
		</form>
	)
}