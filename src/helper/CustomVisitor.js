import CalculadoraVisitor from '../grammar/CalculadoraVisitor.js';

// This class defines a complete generic visitor for a parse tree produced by CalculadoraParser.

export default class CustomVisitor extends CalculadoraVisitor {

	// Visit a parse tree produced by CalculadoraParser#file.
	visitFile(ctx) {
		return this.visitChildren(ctx);
	}

	// Visit a parse tree produced by CalculadoraParser#timesDiv.
	visitTimesDiv(ctx) {
		const operation_data = this.visitChildren(ctx);
		return (ctx.operation.type == 5) ? 
			operation_data[0] * operation_data[2]
			:
			operation_data[0] / operation_data[2]
	};

	// Visit a parse tree produced by CalculadoraParser#plusSubtraction.
	visitPlusSubtraction(ctx) {
		const operation_data = this.visitChildren(ctx)
		return (ctx.operation.type == 3) ? 
			operation_data[0] + operation_data[2]
			:
			operation_data[0] - operation_data[2]
	};

	// Visit a parse tree produced by CalculadoraParser#implicitMultExpr.
	visitImplicitMultExpr(ctx) {
		let results = this.visitChildren(ctx)
		return results[0] * results[1];
	}

	// Visit a parse tree produced by CalculadoraParser#parentheses.
	visitParentheses(ctx) {
		let visit = this.visitChildren(ctx)
		return visit[1];
	}
	
	// Visit a parse tree produced by CalculadoraParser#number.
	visitNumber(ctx) {
		return Number(ctx.getText());
	};
};