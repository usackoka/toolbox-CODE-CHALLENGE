import { WordToMirror, IsPalindrome } from "./../utils/index.js";

export default {
	iecho: async (req, res, next) => {
		res
			.status(200)
			.send({
				textOriginal: req.query.text,
				text: WordToMirror(req.query.text),
				palindrome: IsPalindrome(req.query.text),
			});
	},
};
