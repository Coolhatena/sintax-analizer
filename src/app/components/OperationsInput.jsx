'use client'
import React, { useState } from "react";

import analizer from '@/module/analizer';
import automata from '@/helper/automata';

const OperationsInput = () => {
	const [inputText, setInputText] = useState("");
	const [results, setResults] = useState([])
	const [errors, setErrors] = useState([])


	const onTextareaChange = (event) => {
		setInputText(event.target.value);
	};

	let analizeText = (text) => {
		setErrors([]);
		setResults([]);
		// Check block comments
		let isBlockGood = true;
		for (let i = 0; i < text.length-1; i++) {
			let testText = text[i] + text[i+1];
			if (testText === "/*") {
				isBlockGood = false;
				for (let j = i; j < text.length-1; j++) {
					let secondTestText = text[j] + text[j+1];
					if (secondTestText === "*/") {
						isBlockGood = true;
						i = j;
						break;
					}
				}
			}	
		}

		// Check invalid characters
		let textWithNoComments = automata(inputText);
		let isValidChar = true
		for (let i = 0; i < textWithNoComments.length; i++) {
			let char = textWithNoComments[i];
			if (/[0-9]/.test(char) || ['+', '-', '*', '/', '(', ')', ' ', '\n'].includes(char)){
				continue
			} else {
				isValidChar = false
			}
		}

		return [isBlockGood, isValidChar];
	};

	let handleResolveClick = () => {
		let [isBlockGood, isValidChar] = analizeText(inputText);
		if (isBlockGood && isValidChar) {
			let textWithNoComments = automata(inputText);
			let operations = textWithNoComments.split('\n').filter((str) => str !== '')
			let formattedResults =[]
			let operationNum = 0
			operations.map(operation => {
				let result = analizer(operation);
				result.map((element) => {
					formattedResults.push(`Resultado de ${operations[operationNum]}: ${element}`);
					operationNum++;
				})

			})
			setResults(formattedResults);
		} else {
			let runtimeErrors = []
			if (!isBlockGood) {
				runtimeErrors.push("Error: Se encontro un error de sintaxis en comentarios")
			}

			if (!isValidChar){
				runtimeErrors.push("Error: Se encontraron caracteres invalidos")
			}

			setErrors(runtimeErrors)
		}
	};

	let clean = () => {
		setInputText('');
		setResults([]);
		setErrors([]);
	}

	return (
		<div className='operations-input'>
			<p className='operations-input-title'>Ingresa tus operaciones aritméticas y haz click en el botón "Resolver" para ver los resultado</p>
			<p className='operations-input-instruction'>INSTRUCCIONES:</p>
			<p className='operations-input-instruction'>1. Puedes ingresar comentarios de linea "//" o de bloque "/**/"</p>
			<p className='operations-input-instruction'>2. Puedes utilizar parentesis para separar la jerarquia de tus operaciones</p>
			<p className='operations-input-instruction'>3. Solo se pueden ingresar numeros enteros</p>
			<p className='operations-input-instruction'>4. No se deben ingresar letras</p>
			<textarea
				id="operation-textarea"
				className='operations-input-textarea'
				value={inputText}
				onChange={onTextareaChange}
				placeholder='Ingrese sus operaciones'
			></textarea>
			<div className='button-container'>
				<button id="resolve" onClick={handleResolveClick} className='operations-input-button'>
					Resolver
				</button>
				<button id="resolve" onClick={clean} className='operations-input-button'>
					Limpiar
				</button>
			</div>
			{
				results.length !== 0 ? 
					<>
						<h2 className='operations-input-result-title'>Resultados:</h2>
						<div className='operations-input-result-container'>
							{
								results.map((text, i) => (
									<p key={i} className='operations-input-result'>{text}</p>
									))
								}
						</div>
					</>
					:
					null
			}
			{
				errors.length !== 0 ? 
					<div className='operations-input-result-container'>
						{
							errors.map((text, i) => (
								<p key={i} className='operations-input-result'>{text}</p>
							))
						}
					</div>
					:
					null
			}
		</div>
	);
};

export default OperationsInput;
