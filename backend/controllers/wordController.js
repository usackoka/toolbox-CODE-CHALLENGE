import { WordToMirror, IsPalindrome } from "./../utils/index.js";

export default {
	iecho: async (req, res, next) => {
        res.status(200).send({text: WordToMirror(req.query.text), palindrome: IsPalindrome(req.query.text)});
	},
};