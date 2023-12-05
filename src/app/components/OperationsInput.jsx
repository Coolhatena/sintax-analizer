'use client'
import React, { useState } from "react";

import analizer from '@/module/analizer';
import automata from '@/helper/automata';

const OperationsInput = () => {
	const [inputText, setInputText] = useState("");
	const [results, setResults] = useState([])


	const onTextareaChange = (event) => {
		setInputText(event.target.value);
	};

	let handleResolveClick = () => {
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
	};

	return (
		<div className='operations-input'>
			<p className='operations-input-title'>Ingresa tus operaciones aritméticas y haz click en el botón para ver el resultado en consola</p>
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
			></textarea>
			<button id="resolve" onClick={handleResolveClick} className='operations-input-button'>
				Resolver
			</button>
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
		</div>
	);
};

export default OperationsInput;
