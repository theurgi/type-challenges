const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Relative to the package.json file
const TEMPLATE_DIRECTORY = './scripts/template'

// Get the arguments
const args = process.argv.slice(2)
const name = args[0]
const level = args[1]

// Check if required arguments are provided
if (!name || !level) {
	console.error('Please provide a name and level (easy, medium, hard).')
	process.exit(1)
}

// Define the destination path based on the level argument
let destination

switch (level) {
	case 'easy':
		destination = './easy'
		break
	case 'medium':
		destination = './medium'
		break
	case 'hard':
		destination = './hard'
		break
	default:
		console.error('Invalid level. Please choose between easy, medium, or hard.')
		process.exit(1)
}

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destination)) {
	fs.mkdirSync(destination)
}

// Generate the new directory path
const newDirectory = path.join(destination, name)

// Copy the template directory to the new destination
execSync(`cp -r ${TEMPLATE_DIRECTORY} ${newDirectory}`)

console.log(`New directory created: ${newDirectory}`)

console.log('Readme entry: ')
console.log(`
<tr>
<td></td>
<td><a href="./${level}/${name}/README.md"><b>TODO ADD TITLE</b></a></td>
<td><a href="./${level}/${name}/notes.md">notes</a></td>
<td><a href="./${level}/${name}/solution.ts">solution</a></td>
</tr>`)
