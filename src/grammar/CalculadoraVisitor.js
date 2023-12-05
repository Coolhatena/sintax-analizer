// Generated from ./grammar/Calculadora.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';

// This class defines a complete generic visitor for a parse tree produced by CalculadoraParser.

export default class CalculadoraVisitor extends antlr4.tree.ParseTreeVisitor {

	// Visit a parse tree produced by CalculadoraParser#file.
	visitFile(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by CalculadoraParser#timesDiv.
	visitTimesDiv(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by CalculadoraParser#parentheses.
	visitParentheses(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by CalculadoraParser#number.
	visitNumber(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by CalculadoraParser#implicitMultExpr.
	visitImplicitMultExpr(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by CalculadoraParser#plusSubtraction.
	visitPlusSubtraction(ctx) {
	  return this.visitChildren(ctx);
	}



}