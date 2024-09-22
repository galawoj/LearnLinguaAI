import { describe, expect, test } from 'vitest'
import  randomElementsFromArray  from './randomElementsFromArray.ts'


describe('randomElementsFromArray',()=>{
    test('is array long enought', () => {

        const inputArray = new Array(100).fill(0)
        const lengthOfNewArray = Math.floor(Math.random()*100) || 1  
        
        expect(randomElementsFromArray(inputArray,lengthOfNewArray).length).toEqual(lengthOfNewArray)
        })

    test('if array is shorter, return array', () => {

        const inputArray = new Array(100).fill(0)
        const lengthOfNewArray = inputArray.length+1
            
        expect(randomElementsFromArray(inputArray,(lengthOfNewArray))).toEqual(inputArray)
            
        })


            
    test('should return unique elements',()=>{
            
            const inputArray = [1,2,3,4,5]
            const returnArray = randomElementsFromArray(inputArray,inputArray.length)
            const uniqeSet = new Set(returnArray)
            
            expect(uniqeSet.size).toEqual(returnArray.length)
        })

    test('should return single element if array has only one element',()=>{
            
            const inputArray = [1]
     
            expect(randomElementsFromArray(inputArray,5)).toEqual(inputArray)
        })

    test('empty array',()=>{
            
            const inputArray: number[] = []
            expect(randomElementsFromArray(inputArray,1)).toEqual(inputArray)
        })
        
})
