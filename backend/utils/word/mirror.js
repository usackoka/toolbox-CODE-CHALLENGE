export default function mirror (word) {
  const arr = word.toString().split('')
  return arr.reverse('').join('')
}
