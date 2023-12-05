import antlr4 from 'antlr4'
import CalculadoraLexer from '../grammar/CalculadoraLexer.js';
import CalculadoraParser from '../grammar/CalculadoraParser.js';
// import CalculadoraVisitor from '../grammar/CalculadoraVisitor.js';
import CustomVisitor from '../helper/CustomVisitor.js';

let analizer = (input) => {
	const chars = new antlr4.InputStream(input);
	const lexer = new CalculadoraLexer(chars);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new CalculadoraParser(tokens);
	parser.buildParseTrees = true;
	const tree = parser.file();
	const visitor = new CustomVisitor();
	
	return visitor.visitFile(tree);
}

export default analizer;
