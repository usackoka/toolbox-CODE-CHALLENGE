import { WordToMirror, IsPalindrome } from "./../utils/index.js";

export default {
	iecho: async (req, res, next) => {
        res.status(200).send({test: 'Ok'});
	},
};