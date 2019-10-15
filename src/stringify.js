export default (value, depth) => JSON.stringify(value)
    .replace(/"/g, '')
    .replace(/{/g, `{\n${depth === 0 ? ' '.repeat(8) : ' '.repeat(12)}`)
    .replace(/:/g, ': ')
    .replace(/}/g, `\n${depth === 0 ? ' '.repeat(4) : ' '.repeat(8)}}`);