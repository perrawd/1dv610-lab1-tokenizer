export default function manageError (error) {
  console.error(`Error: ${error.message}`)
  process.exitCode = 1
}
