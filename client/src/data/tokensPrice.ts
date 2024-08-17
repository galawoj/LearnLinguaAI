import { type TokenPriceType } from "../types/TokenPriceType"

export const tokensPrice:TokenPriceType[] = [{modelType:'gpt-4o', input:5,output: 15},{modelType:'gpt-4-turbo', input:10,output: 30},{modelType:'gpt-3.5-turbo', input:0.5,output: 1.5}]

// Here are some helpful rules of thumb for understanding tokens in terms of lengths:
// 1 token ~= 4 chars in English
// 1 token ~= ¾ words
// 100 tokens ~= 75 words
// Or
// 1-2 sentence ~= 30 tokens
// 1 paragraph ~= 100 tokens
// 1,500 words ~= 2048 tokens
// To get additional context on how tokens stack up, consider this:
// Wayne Gretzky’s quote "You miss 100% of the shots you don't take" contains 11 tokens.
// OpenAI’s charter contains 476 tokens.
// The transcript of the US Declaration of Independence contains 1,695 tokens.

// GPT-4o New
// Our fastest and most affordable flagship model
//  Text and image input, text output
//  128k context length
//  Input: $5 | Output: $15*

// GPT-4 Turbo
// Our previous high-intelligence model
//  Text and image input, text output
//  128k context length
//  Input: $10 | Output: $30*

// GPT-3.5 Turbo
// Our fast, inexpensive model for simple tasks
//  Text input, text output
//  16k context length
//  Input: $0.50 | Output: $1.50*

// * prices per 1 million tokens