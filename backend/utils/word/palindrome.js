export default function palindrome(word) {
	var arr = word.toString().split("");
    var mirror = arr.reverse("").join("");
    return mirror === word.toString();
}
