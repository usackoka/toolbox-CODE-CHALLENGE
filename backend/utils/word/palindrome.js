export default function palindrome (word) {
  const arr = word.toString().split('')
  const mirror = arr.reverse('').join('')
  return mirror === word.toString()
}
