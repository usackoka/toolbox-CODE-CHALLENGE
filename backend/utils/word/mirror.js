export default function mirror(word) { 
    var arr = word.toString().split("");
    return arr.reverse("").join("");
}