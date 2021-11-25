const filePath = path.join(__dirname, process.argv[2])
const data = fs.readFileSync(filePath, 'utf-8')

console.log(data)

const options = yargs
    .usage('Usage: -p <path> to file')
    .option('p', {
        alias: 'path',
        describe: 'Path to file',
        type: 'string',
        demandOption: true,
    }).argv

console.log(options)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Please enter the path to the file: ', filePath => {
    console.log(filePath)
    rl.close()
})

const question = (query) => new Promise(resolve => rl.question(query, resolve))

(async () => {
    const filePath = await question('Please enter the path to the file: ')
    const encoding = await question('Please enter encoding: ')

    const fullFilePath = path.resolve(__dirname, filePath)
    const data = fs.readFileSync(fullFilePath, encoding)

    console.log(data)

    rl.close()
})()

const isFile = (fileName) => fs.lstatSync(fileName).isFile()

const list = fs.readdirSync('./').filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list',
        message: 'Choose a file to read:',
        choices: list
    },
]).then(({fileName}) => {

    const fullFilePath = path.join(__dirname, fileName)
    const data = fs.readFileSync(fullFilePath, 'utf-8')

    console.log(data)
})
