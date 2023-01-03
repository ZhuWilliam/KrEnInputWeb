// Imported and adapted from arutarimu's original version at https://github.com/arutarimu/KrEnInput
FIRST_CHAR = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ",
			  "ㅍ", "ㅎ"]
MID_CHAR = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ",
			"ㅠ", "ㅡ", "ㅢ", "ㅣ"]
FINAL_CHAR = [" ", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ",
			  "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]
KR_EN_DICTIONARY = {'ㅂ': 'q', 'ㅈ': 'w', 'ㄷ': 'e', 'ㄱ': 'r', 'ㅅ': 't', 'ㅛ': 'y', 'ㅕ': 'u', 'ㅑ': 'i', 'ㅐ': 'o',
					'ㅔ': 'p', 'ㅁ': 'a', 'ㄴ': 's', 'ㅇ': 'd', 'ㄹ': 'f', 'ㅎ': 'g', 'ㅗ': 'h', 'ㅓ': 'j', 'ㅏ': 'k',
					'ㅣ': 'l', 'ㅋ': 'z', 'ㅌ': 'x', 'ㅊ': 'c', 'ㅍ': 'v', 'ㅠ': 'b', 'ㅜ': 'n', 'ㅡ': 'm', 'ㅃ': 'Q',
					'ㅉ': 'W', 'ㄸ': 'E', 'ㄲ': 'R', 'ㅆ': 'T', 'ㅒ': 'O', 'ㅖ': 'P', 'ㅘ': 'hk', 'ㅙ': 'ho', 'ㅚ': 'hl',
					'ㅝ': 'nj', 'ㅞ': 'np', 'ㅟ': 'nl', 'ㅢ': 'ml', 'ㄳ': 'rt', 'ㄵ': 'sw', 'ㄶ': 'sg', 'ㄺ': 'fr',
					'ㄻ': 'fa', 'ㄼ': 'fq', 'ㄽ': 'ft', 'ㄾ': 'fx', 'ㄿ': 'fv', 'ㅀ': 'fg', 'ㅄ': 'qt'}

const kr = document.querySelector('#kr');
const en = document.querySelector('#en');

const decompose = (korean) => {
	const wordList = korean;
	let result = [];
	
	[...wordList].forEach((word) => {
		if (word.match('.*[ㄱ-ㅎㅏ-ㅣ가-힣]')) {
			const char = word.codePointAt() - 44032;
			const first = Math.floor(char / 588);
			result.push(FIRST_CHAR[first]);
			const mid = Math.floor((char - (first * 588)) / 28);
			result.push(MID_CHAR[mid]);
			final = Math.floor(char - (first * 588) - (mid * 28));
			
			if (FINAL_CHAR[final].trim()) {
				result.push(FINAL_CHAR[final]);
			}
		}
		else {
			result.push(word);
		}
	});
	
	return result;
};

const convert = (wordList) => {
	let result = '';
	[...wordList].forEach((word) => {
		if (word in KR_EN_DICTIONARY) {
			result += KR_EN_DICTIONARY[word];
		}
		else {
			result += word;
		}
	});
	
	return result;
};

kr.addEventListener('input', (event) => {
	event.preventDefault();
	const input = kr.value.trim();
	const output = convert(decompose(input));
	en.value = output;
}, false);