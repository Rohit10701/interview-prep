/*

    Explain the difference between shallow and deep copy for nested objects and arrays.

*/


const original = { a: 1, b: { c: 2 } };

const shallowCopy = { ...original };
console.log({shallowCopy})
shallowCopy.b.c = 3;

console.log(original.b.c); // 3 (changes in shallowCopy affect original)
console.log({original})
console.log(shallowCopy.b.c); // 3
console.log({shallowCopy})




const deepCopy = JSON.parse(JSON.stringify(original)); // Simple deep copy
deepCopy.b.c = 3;

console.log(original.b.c); // 2 (original is unaffected)
console.log(deepCopy.b.c); // 3



const data = {
	a: 1,
	b: [1, 2, 4],
	c: {
		x: 'nested'
	}
}

function customDeepcopy(data) {
	const clonedData = {}
	for (const [key, value] of Object.entries(data)) {
		// chceks for array
		if (typeof value === 'object' && Array.isArray(value)) {
			clonedData[key] = value.map((item) => {
				// Recursively copy each item if it's an object
				return typeof item === 'object' ? customDeepcopy(item) : item
			})
		}
		// checks for object
		else if (typeof value === 'object' && value !== null) {
			clonedData[key] = customDeepcopy(value)
		} else {
			clonedData[key] = value
		}
	}
	return clonedData
}

// console.log(JSON.stringify(customDeepcopy(data), null, 2))

describe('customDeepcopy', () => {
	it('should deeply copy the nested data', () => {
		const original = {
			a: 1,
			b: [1, 2, 4],
			c: {
				x: 'nested'
			}
		}

		const copy = customDeepcopy(original)

		// Test basic equality
		expect(copy).toEqual(original)
		// Test deep equality (no reference to the original)
		expect(copy).not.toBe(original)
		expect(copy.c).not.toBe(original.c) // Ensure nested object is also copied deeply
		expect(copy.b).not.toBe(original.b) // Ensure array is copied deeply
	})
})
