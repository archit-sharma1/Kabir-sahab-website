// The doha corpus. This is the only place doha content lives.
//
// - `id` is permanent: it is shown as "Doha N" and used in /doha/N links.
//   Never renumber or reuse an id; a new doha gets the next unused number.
// - `source` is optional and shown on the card; only add one you can cite.
// - `unverified: true` marks dohas no published collection could be traced
//   to; the card shows "Source unverified".
// - Kabir is always "Kabir Saheb" in English meanings. Hindi text is left
//   exactly as written. Dohas end line 1 with । and line 2 with ॥; the few
//   longer verses (more than two lines) end their last line with ॥.

export interface Doha {
	id: number;
	text: string;
	meaning: string;
	source?: string;
	unverified?: boolean;
}

export const dohas: readonly Doha[] = [
	{
		id: 1,
		text: "बुरा जो देखन मैं चला, बुरा न मिलिया कोय।\nजो दिल खोजा आपना, मुझसे बुरा न कोय॥",
		meaning: "I went out looking for a wicked person, but found none. When I searched my own heart, I found none worse than myself."
	},
	{
		id: 2,
		text: "माटी कहे कुम्हार से, तू क्या रौंदे मोहि।\nएक दिन ऐसा आएगा, मैं रौंदूंगी तोहि॥",
		meaning: "The clay says to the potter, why do you trample me so? A day will come when I shall trample you the same way — a reminder that all bodies return to earth."
	},
	{
		id: 3,
		text: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय।\nढाई आखर प्रेम का, पढ़े सो पंडित होय॥",
		meaning: "Reading scripture after scripture, the world has died, yet none became truly wise. Whoever reads the two-and-a-half letters of 'love' alone becomes learned."
	},
	{
		id: 4,
		text: "काल करे सो आज कर, आज करे सो अब।\nपल में परलय होयगी, बहुरि करेगा कब॥",
		meaning: "What you plan for tomorrow, do today; what you plan for today, do now. In an instant all can end — when else will you do it?"
	},
	{
		id: 5,
		text: "साईं इतना दीजिए, जा में कुटुम समाय।\nमैं भी भूखा न रहूँ, साधु न भूखा जाय॥",
		meaning: "O Sai, give me only as much as my household needs — so that I do not go hungry, and no sadhu who comes to my door leaves hungry."
	},
	{
		id: 6,
		text: "दुःख में सुमिरन सब करे, सुख में करे न कोय।\nजो सुख में सुमिरन करे, तो दुःख काहे होय॥",
		meaning: "Everyone turns to remembrance of the Truth in sorrow; no one does so in joy. If one remembered in joy too, why would sorrow ever come?"
	},
	{
		id: 7,
		text: "बड़ा हुआ तो क्या हुआ, जैसे पेड़ खजूर।\nपंथी को छाया नहीं, फल लागे अति दूर॥",
		meaning: "What good is being great like the date palm tree — it gives no shade to the traveller, and its fruit hangs far out of reach."
	},
	{
		id: 8,
		text: "जब मैं था तब हरि नहीं, अब हरि है मैं नाहिं।\nसब अँधियारा मिट गया, जब दीपक देख्या माहिं॥",
		meaning: "When the ‘I’ was there, Hari was not; now Hari is, and the ‘I’ is gone. All darkness vanished the moment I saw the lamp within."
	},
	{
		id: 9,
		text: "चलती चाकी देख कर, दिया कबीरा रोय।\nदो पाटन के बीच में, साबुत बचा न कोय॥",
		meaning: "Seeing the grinding millstone, Kabir Saheb wept — for between its two wheels, nothing whole ever survives."
	},
	{
		id: 10,
		text: "तिनका कबहूँ ना निंदिए, जो पाँव तले होय।\nकबहूँ उड़ी आँख पड़े, पीर घनेरी होय॥",
		meaning: "Never mock even a straw beneath your feet; should it fly up into your eye, the pain would be immense."
	},
	{
		id: 11,
		text: "कस्तूरी कुण्डल बसे, मृग ढूँढे बन माहि।\nऐसे घट घट राम है, दुनिया देखे नाहि॥",
		meaning: "The musk lies within the deer's own navel, yet it searches the forest for it. In the same way Ram, the Real, lives in every heart, yet the world does not see it."
	},
	{
		id: 12,
		text: "जैसे तिल में तेल है, ज्यों चकमक में आग।\nतेरा साईं तुझ में है, तू जाग सके तो जाग॥",
		meaning: "As oil dwells within the sesame seed, and fire within the flint, your Sai, the Real, is within you — wake up to it if you can."
	},
	{
		id: 13,
		text: "अति का भला न बोलना, अति की भली न चूप।\nअति का भला न बरसना, अति की भली न धूप॥",
		meaning: "Excess speech is not good, nor is excess silence. Excess rain is not good, nor is excess sun — moderation is the way."
	},
	{
		id: 14,
		text: "मन के हारे हार है, मन के जीते जीत।\nकहे कबीर हरि पाइए, मन ही की परतीत॥",
		meaning: "Defeat lies in a defeated mind, victory in a victorious one. Kabir Saheb says: Hari is found only through the mind's own conviction."
	},
	{
		id: 15,
		text: "कबीरा खड़ा बाज़ार में, माँगे सबकी खैर।\nना काहू से दोस्ती, ना काहू से बैर॥",
		meaning: "Kabir Saheb stands in the marketplace wishing everyone well — friendship with none in particular, enmity with none at all."
	},
	{
		id: 16,
		text: "गुरु गोविन्द दोऊ खड़े, काके लागूँ पाँय।\nबलिहारी गुरु आपने, गोविन्द दियो बताय॥",
		meaning: "If the Guru and Govind both stand before me, whose feet should I touch first? I give myself to the Guru, for it was the Guru who showed me Govind."
	},
	{
		id: 17,
		text: "जाति न पूछो साधु की, पूछ लीजिये ज्ञान।\nमोल करो तलवार का, पड़ा रहन दो म्यान॥",
		meaning: "Do not ask a seeker's caste, ask only of his wisdom. Value the sword itself, and leave the scabbard where it lies."
	},
	{
		id: 18,
		text: "पानी केरा बुदबुदा, अस मानुष की जात।\nदेखत ही छिप जायेगा, ज्यूँ तारा परभात॥",
		meaning: "Human life is like a bubble on water; it will vanish before your eyes, as a star fades at dawn."
	},
	{
		id: 19,
		text: "यह तन विष की बेलरी, गुरु अमृत की खान।\nसीस दियो जो गुरु मिले, तो भी सस्ता जान॥",
		meaning: "This body is a vine of poison; the Guru is a mine of nectar. Even if one had to give one's head to find such a Guru, it would still be a bargain."
	},
	{
		id: 20,
		text: "निंदक नियरे राखिये, आँगन कुटी छवाय।\nबिन पानी साबुन बिना, निर्मल करे सुभाय॥",
		meaning: "Keep your critic close, build his hut in your own courtyard. Without water or soap, he cleanses your nature for free."
	},
	{
		id: 21,
		text: "हीरा पड़ा बाज़ार में, रहा छार लपटाय।\nबहुतक मूरख चलि गए, पारखी लिया उठाय॥",
		meaning: "A diamond lay in the marketplace, covered in dust. Many fools walked past it; only a true connoisseur picked it up."
	},
	{
		id: 22,
		text: "जिन खोजा तिन पाइया, गहरे पानी पैठ।\nमैं बपुरा बूडन डरा, रहा किनारे बैठ॥",
		meaning: "Those who dived deep into the water found the pearl; I, timid, feared drowning and stayed sitting on the shore."
	},
	{
		id: 23,
		unverified: true,
		text: "आपुहि गावे आपुहि सुने, आपहि करता टीक।\nकहे कबीर कुछ हाथ न आवे, ज्यों मथे रीत ही रीत॥",
		meaning: "One who sings his own praise, hears it himself, and rates himself — such churning is empty, says Kabir Saheb, and yields nothing."
	},
	{
		id: 24,
		text: "धीरे धीरे रे मना, धीरे सब कुछ होय।\nमाली सींचे सौ घड़ा, ऋतु आये फल होय॥",
		meaning: "Slowly, slowly, O mind, everything happens in its own time. The gardener may pour a hundred pots of water, but the fruit ripens only in its season."
	},
	{
		id: 25,
		unverified: true,
		text: "बुरे बख्त पर मीत सब, तज देते हैं साथ।\nकबिरा तेहि दिन जानिये, जब देवे परमेश्वर हाथ॥",
		meaning: "In hard times even friends may leave one's side. Kabir Saheb says, know that day for what it is — the day when the Supreme alone holds your hand."
	},
	{
		id: 26,
		text: "कबिरा सोई पीर है, जो जाने पर पीर।\nजो पर पीर न जानई, सो काफिर बे पीर॥",
		meaning: "Kabir Saheb says, a true guide is one who feels another's pain. One who does not feel another's pain is faithless, without compassion."
	},
	{
		id: 27,
		text: "करता था तो क्यों रहा, अब करि क्यों पछताय।\nबोया पेड़ बबूल का, आम कहाँ ते खाय॥",
		meaning: "Why did you not think before acting? Why regret it now? Having sown a thorn tree, from where will you eat a mango?"
	},
	{
		id: 28,
		text: "जग में बैरी कोई नहीं, जो मन शीतल होय।\nयह आपा तो डाल दे, दया करे सब कोय॥",
		meaning: "No one is an enemy in this world, if the mind is cool and calm. Cast away this ego, and everyone will show you kindness."
	},
	{
		id: 29,
		text: "सुखिया सब संसार है, खाए अरु सोवे।\nदुखिया दास कबीर है, जागे अरु रोवे॥",
		meaning: "The whole world is content, eating and sleeping without a care. Kabir Saheb alone stays sorrowful, awake through the night, and weeps."
	},
	{
		id: 30,
		text: "कबीर सोता क्या करे, जागो जपो मुरार।\nएक दिना है सोवना, लंबे पाँव पसार॥",
		meaning: "Kabir Saheb asks, why do you lie asleep? Wake up and remember Murari. A day is coming when you will sleep for good, your legs stretched out long."
	},
	{
		id: 31,
		text: "शब्द हमारा आदि का, शब्दहि पैठा जीव।\nफूल रहन की टोकनी, घोरा खाया घीव॥",
		meaning: "Our Word is from the very beginning; the living being has entered into the Word. A basket for keeping flowers — and the horse has eaten the ghee. In other words, what is precious is wasted on what cannot use it, as a life is wasted when the Word is not taken in.",
		source: "बीजक — साखी ३"
	},
	{
		id: 32,
		text: "शब्द बिना श्रुति आंधरी, कही कहाँ की जाय।\nद्वार न पावे शब्द का, फिरि फिरि भटका खाय॥",
		meaning: "Without the Word, even scripture is blind—where can it lead? It cannot reach the doorway of the Word and keeps wandering, suffering again and again.",
		source: "बीजक — साखी ४"
	},
	{
		id: 33,
		text: "शब्द शब्द बहु अंतरा, सार शब्द मथि लीजे।\nकह कबीर जेहि सार शब्द नहि, धिग जीवन तेहि दीजे॥",
		meaning: "There is a vast difference between one 'word' and another; churn them and take the essential Word. Kabir Saheb says: a life that has not found that essential Word is a life gone to waste.",
		source: "बीजक — साखी ५"
	},
	{
		id: 34,
		text: "शब्दे मारा गिरि गया, शब्दे छोड़ा राज।\nजिन जिन शब्द विवेकिया, तिनकी सरिया काज॥",
		meaning: "By a word one may be struck down; by a word one may renounce a kingdom. Those who discerned the true Word brought their work to completion.",
		source: "बीजक — साखी ६"
	},
	{
		id: 35,
		text: "शब्द हमारा आदि का, पल पल करे जो याद।\nअंत फलेगी महल में, ऊपर की सब बाद॥",
		meaning: "Our Word is from the beginning; remember it every moment. In the end it will bear fruit in the true abode; everything merely laid on top is argument and noise.",
		source: "बीजक — साखी ७"
	},
	{
		id: 36,
		text: "जिन जिन संबल ना किया, अस पुर पाटन पाय।\nझाल परे दिन आथये, संबल किया न जाय॥",
		meaning: "Those who made no provision after gaining this rare human city will find, when the final hour arrives, that provision can no longer be made.",
		source: "बीजक — साखी ८"
	},
	{
		id: 37,
		text: "इहई संबल करिले, आगे विषमी बाट।\nसरग विसाहन सब चले, जहाँ बनियाँ नाहीं हाट॥",
		meaning: "Make this your provision here and now, for the road ahead is difficult. All set out to purchase heaven, but there is no merchant's market there.",
		source: "बीजक — साखी ९"
	},
	{
		id: 38,
		text: "जो जानो जीव आपना, तो करहु जीव को सार।\nजियरा ऐसा पाहुना, मिले न दूजी बार॥",
		meaning: "If you know the living self to be your own, then attend to its true welfare. This life is such a guest that it will not come a second time in the same way.",
		source: "बीजक — साखी १०"
	},
	{
		id: 39,
		text: "जो जानहु पीव आपना, तो जानो सो जीव।\nपानी पछाबहु आपना, पानी माँगे न पीव॥",
		meaning: "If you know the Beloved as your own, then know what the living self truly is. First discern your own water; the Beloved does not go begging for borrowed water.",
		source: "बीजक — साखी ११"
	},
	{
		id: 40,
		text: "पानी पियावत क्या फिरो, घर घर सायर बारि।\nतृषावंत जो होयगा, पीवेगा झख मारि॥",
		meaning: "Why roam from house to house offering water when the ocean is everywhere? Whoever is truly thirsty will, out of necessity, come and drink.",
		source: "बीजक — साखी १२"
	},
	{
		id: 41,
		text: "हंसा मोती बिकानिया, कंचन थार भराय।\nजो जस मर्म न जानिया, सो तस काह कराय॥",
		meaning: "O swan, pearls are being sold on golden trays. If one does not know their true worth, what can anyone else do for him?",
		source: "बीजक — साखी १३"
	},
	{
		id: 42,
		text: "हंसा तुम सुवरण बरन, का बरनौं मैं तोहि।\nतरवर पाय पहेलि हो, तबे सराहौं लोहि॥",
		meaning: "O swan, your nature is golden—how can I adequately describe you? When you reach the far shore beyond this tree-like world, then shall I truly praise you.",
		source: "बीजक — साखी १४"
	},
	{
		id: 43,
		text: "हंसा तू तो सबल था, हलकी अपनी चाल।\nरंग कुरंगी रंगिया, किया और लगवार॥",
		meaning: "O swan, you were strong, yet you made your own gait weak. You dyed yourself in alien colors and attached yourself elsewhere.",
		source: "बीजक — साखी १५"
	},
	{
		id: 44,
		text: "पाँच तत्त्व के भीतरे, गुप्त वस्तु अस्थान।\nबिरला मर्म कोइ पाइहै, गुरु के शब्द प्रमाण॥",
		meaning: "Within the body made of five elements lies a hidden Reality and its abode. Rare is the one who discovers its secret, taking the Guru's Word as the means of discernment.",
		source: "बीजक — साखी २७"
	},
	{
		id: 45,
		text: "अजपा जपत अड़ि आसने, पिण्ड झरोखे नूर।\nतांके दिल में हौं बसौं, सेना लिये हजूर॥",
		meaning: "Established in the seat of inner, unuttered remembrance, one sees the Light through the window of the body. In such a heart, says Kabir Saheb, I dwell in full presence.",
		source: "बीजक — साखी २८"
	},
	{
		id: 46,
		text: "हृदया भीतर आरसी, मुख तो देखा न जाय।\nमुख तो तबहीं देखिहौ, जब दिल की दुविधा जाय॥",
		meaning: "Within the heart is a mirror, yet the face cannot be seen. You will behold it only when the heart's division and doubt have disappeared.",
		source: "बीजक — साखी २९"
	},
	{
		id: 47,
		text: "ऊँचे गाँव पहाड़ पर, औ मोटे की बाँह।\nऐसा ठाकुर सेविए, उबरिए जाकी छाँह॥",
		meaning: "The village is high upon the mountain; hold on to the arm of the strong. Serve such a Thakur, a master, that you are saved in his shade.",
		source: "बीजक — साखी ३०"
	},
	{
		id: 48,
		text: "जेहि मारग गये पंडिता, तेही गई बहीर।\nऊँची घाटी राम की, तेहि चढ़ि रहे कबीर॥",
		meaning: "The scholars went by one road, and the crowd followed after them. Kabir Saheb climbed instead the steep ascent of Ram.",
		source: "बीजक — साखी ३१"
	},
	{
		id: 49,
		text: "घर कबीर का शिखर पर, जहाँ सिलहली गैल।\nपाँव न टिके पिपीलिका, खलकन लादे बैल॥",
		meaning: "Kabir Saheb's home is upon the summit, reached by a slippery path. Even an ant cannot keep its footing there, yet worldly people try to load an ox and take it up.",
		source: "बीजक — साखी ३३"
	},
	{
		id: 50,
		text: "बिन फूल भौंरा रस चखे, कहु बिरवा को नाँव।\nऐसा तत्त्व बिचारिये, चढ़ि रहे निरबाँण॥",
		meaning: "The bee tastes nectar where no flower is seen—tell me, what tree is that? Contemplate such a Reality and ascend toward liberation.",
		source: "बीजक — साखी ३६"
	},
	{
		id: 51,
		text: "चंदन बास निवारहु, तुझ कारण वन काटिया।\nजीवत जीव जनि मारहु, मुए ते सबे निपातिया॥",
		meaning: "Remove the fragrance of sandalwood, and the forest is cut down on your account. Do not kill the living while they live; once life is gone, all falls away.",
		source: "बीजक — साखी ३७"
	},
	{
		id: 52,
		text: "चंदन सर्प लपेटिया, चंदन काह कराय।\nरोम रोम विष भीनिया, अमृत कहाँ समाय॥",
		meaning: "A serpent coils around sandalwood—what can the sandalwood do? If every pore is soaked in poison, where can nectar find a place?",
		source: "बीजक — साखी ३८"
	},
	{
		id: 53,
		text: "गहि टेक छोड़े नहीं, चोंच जीभ जरि जाय।\nमीठो कहा अंगार में, ताहि चकोर चबाय॥",
		meaning: "It will not abandon the support it has seized, even though beak and tongue are burned. What sweetness can there be in embers, that the chakor bird still keeps pecking them?",
		source: "बीजक — साखी ४०"
	},
	{
		id: 54,
		text: "हीरा पड़ा बाज़ार में, दुनिया जामे डोल।\nजहाँ हीरे का पारखी, तहाँ हीरे का मोल॥",
		meaning: "A diamond lies in the marketplace while the world wanders around it. Where there is a true appraiser of diamonds, there the diamond receives its proper value."
	},
	{
		id: 55,
		text: "गुरु बेचारा क्या करे, शब्द न लागे अंग।\nकहैं कबीर काली चादर, कैसे चढ़े रंग॥",
		meaning: "What can the poor Guru do if the Word does not touch one's being? Kabir Saheb says: how can a black cloth take on another colour?"
	},
	{
		id: 56,
		text: "चार राम हैं जगत में, तीन राम व्यवहार।\nचौथे राम सो सार हैं, ताको करो विचार॥",
		meaning: "There are four forms of Ram in the world; three are known in ordinary usage. The fourth Ram is the true essence—reflect deeply upon that Ram."
	},
	{
		id: 57,
		text: "ऐसी वाणी बोलिए, मन का आपा खोए।\nऔरन को शीतल करे, आपहुँ शीतल होए॥",
		meaning: "Speak such words that the ego of the mind dissolves. They bring coolness to others, and you too become serene."
	},
	{
		id: 58,
		text: "प्रभुता को सब कोई भजै, प्रभु को भजै न कोय।\nकहैं कबीर प्रभु को भजै, प्रभुता चेरी होय॥",
		meaning: "Everyone worships power, but no one worships Prabhu, the Real. Kabir Saheb says: whoever worships Prabhu, power itself becomes their servant."
	},
	{
		id: 185,
		text: "पाहन पूजे हरि मिले, तो मैं पूजूँ पहार।\nताते तो चक्की भली, पीसि खाये संसार॥",
		meaning: "If Hari could be found by worshipping a stone, I would worship a mountain. Better than that stone is the millstone, which grinds grain for the world to eat.",
		source: "सद्गुरु कबीर की साखी — भूमिका"
	},
	{
		id: 186,
		text: "सतगुरु ऐसा कीजिये, लोभ मोह भ्रम नाँहि।\nदरिया सो न्यारा रहे, दीखे दरिया माँहि॥",
		meaning: "Choose such a Satguru in whom there is no greed, attachment or delusion—one who remains distinct from the river even while appearing within it.",
		source: "सद्गुरु कबीर की साखी — भूमिका"
	},
	{
		id: 187,
		text: "हिन्दू अपनी करे बड़ाई, गागर छुअन न देई।\nवैश्या के पायन तर सोवै, ये देखो हिन्दुआई॥",
		meaning: "The Hindu boasts of himself and will not let another touch his water-pot, yet sleeps at a courtesan's feet—behold this Hindu conduct.",
		source: "सद्गुरु कबीर की साखी — भूमिका"
	},
	{
		id: 188,
		text: "मुसलमान के पीर औलिया, मुर्गी मुर्गी खाई।\nखाला केरी बेटी ब्याहावै, घर में करे सगाई॥",
		meaning: "The Muslims' pirs and saints eat fowl after fowl; one marries his maternal aunt's daughter and arranges the match within the family.",
		source: "सद्गुरु कबीर की साखी — भूमिका"
	},
	{
		id: 189,
		text: "गुरु को कीजै दंडवत, कोटि कोटि परनाम।\nकीट न जाने भृंगको, गुरु करिले आप समान॥",
		meaning: "Prostrate before the Guru and offer countless salutations. As the insect does not understand the bhringa, yet the bhringa makes it like itself, so does the Guru make the disciple like himself.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 1"
	},
	{
		id: 190,
		text: "दंडवत गोविन्द गुरु, वंदौं अब जन सोय।\nपहिले भये प्रणाम तिन, नमो जु आगे होय॥",
		meaning: "I prostrate before Govind, the Guru, and bow to those people: salutations to those who came before, and homage to those who will come hereafter.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 2"
	},
	{
		id: 191,
		text: "गुरु गोविन्द करि जानिये, रहिये शब्द समाय।\nमिले तो दंडवत बंदगी, नहीं पल पल ध्यान लगाय॥",
		meaning: "Know the Guru as Govind and remain absorbed in the Word. If you meet the Guru, bow and offer reverence; if not, hold the Guru in meditation every moment.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 3"
	},
	{
		id: 192,
		text: "गुरु गोविन्द दोउ एक हैं, दूजा सब आकार।\nआपा मेटे हरि भजे, तब पावे दीदार॥",
		meaning: "Guru and Govind are one; all appearance of two is only form. When one erases the self and worships Hari, one then beholds the Divine.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 5"
	},
	{
		id: 193,
		text: "गुरु हैं बड़े गोविन्द ते, मन में देखु विचार।\nहरि सिरजे ते वार हैं, गुरु सिरजे ते पार॥",
		meaning: "The Guru is greater than Govind—consider this within your mind. Those fashioned by Hari remain on this shore; those fashioned by the Guru cross beyond.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 6"
	},
	{
		id: 194,
		text: "गुरु तो गरुआ मिला, ज्यों आंटे में लौन।\nजाति पाँति कुल मिटि गया, नाम धरेगा कौन॥",
		meaning: "A weighty Guru was found, like salt mingled into flour. Caste, rank and lineage were erased—who then will retain a separate name?",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 7"
	},
	{
		id: 195,
		text: "गुरु सों ज्ञानजु लीजिये, सीस दीजिये दान।\nबहुतक भोंद बहि गये, राखि जीव अभिमान॥",
		meaning: "Receive knowledge from the Guru, offering your head as the gift. Many fools were swept away because they preserved the living ego's pride.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 8"
	},
	{
		id: 196,
		text: "गुरु की आज्ञा आवई, गुरु की आज्ञा जाय।\nकहैं कबीर सो संत हैं, आवागवन नसाय॥",
		meaning: "One comes by the Guru's command and goes by the Guru's command. Kabir Saheb says: that person is a saint who destroys the cycle of coming and going.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 9"
	},
	{
		id: 197,
		text: "गुरु पारस गुरु पुरुष हैं, चंदन वास सुवास।\nसतगुरु पारस जीव को, दीन्हा मुक्ति निवास॥",
		meaning: "The Guru is the philosopher's stone, the true person, and the fragrant scent of sandalwood. The Satguru, like the philosopher's stone, gives the living being an abode in liberation.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 10"
	},
	{
		id: 198,
		text: "गुरु पारस को अन्तरो, जानत हैं सब सन्त।\nवह लोहा कंचन करे, ये करि लेय महन्त॥",
		meaning: "All saints know the difference between the Guru and the philosopher's stone: that turns iron into gold, while the Guru makes the disciple great like himself.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 11"
	},
	{
		id: 199,
		text: "कुमति कीच चेला भरा, गुरु ज्ञान जल होय।\nजनम जनम का मोरचा, पल में डारे धोय॥",
		meaning: "The disciple is filled with the mud of wrong understanding; the Guru's knowledge is water. In a moment it washes away the grime accumulated over birth after birth.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 12"
	},
	{
		id: 200,
		text: "गुरु धोबी सिष कापड़ा, साबुन सिरजनहार।\nसुरति सिला पर धोइये, निकसे जोति अपार॥",
		meaning: "The Guru is the washerman, the disciple the cloth, and the Creator the soap. Washed upon the stone of attentive awareness, boundless light emerges.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 13"
	},
	{
		id: 201,
		text: "गुरु कुम्हार सिष कुंभ है, गढ़ि गढ़ि काढ़े खोट।\nअन्तर हाथ सहार दे, बाहर बाहे चोट॥",
		meaning: "The Guru is the potter and the disciple the pot; shaping it again and again, the Guru removes its flaws. A hand supports it from within while blows strike it from outside.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 14"
	},
	{
		id: 202,
		text: "गुरु समान दाता नहीं, याचक सीष समान।\nतीन लोक की संपदा, सो गुरु दीन्हीं दान॥",
		meaning: "There is no giver equal to the Guru and no petitioner equal to the disciple. The wealth of the three worlds is what the Guru gives in donation.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 15"
	},
	{
		id: 203,
		text: "पहिले दाता सिष भया, तन मन अरपन सीस।\nपाछे दाता गुरु भये, नाम दिया बखसीस॥",
		meaning: "First the disciple became the giver, offering body, mind and head. Afterwards the Guru became the giver and bestowed the Name as a blessing.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 16"
	},
	{
		id: 204,
		text: "गुरु जो बसै बनारसी, सीष समुदर तीर।\nएक पलक बिसरे नहीं, जो गुण होय सरीर॥",
		meaning: "Though the Guru may live in Banaras and the disciple on the seashore, a worthy disciple does not forget the Guru for even a moment.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 17"
	},
	{
		id: 205,
		text: "लच्छ कोस जो गुरु बसे, दीजे सुरति पठाय।\nशब्द तुरी असवार है, छिन आवै छिन जाय॥",
		meaning: "If the Guru lives a hundred thousand kos away, send your attentive awareness there. The Word is a swift mare and awareness its rider, coming and going in an instant.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 18"
	},
	{
		id: 206,
		text: "गुरु को सिर पर राखिये, चलिये आज्ञा मांहि।\nकहैं कबीर ता दास को, तीन लोक भय नाहिं॥",
		meaning: "Keep the Guru above your head and walk within the Guru's command. Kabir Saheb says: such a servant has no fear in the three worlds.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 19"
	},
	{
		id: 207,
		text: "गुरु को मानुष जो गिने, चरणामृत को पान।\nते नर नरके जायेंगे, जनम जनम ह्वै स्वान॥",
		meaning: "Those who regard the Guru as merely human while drinking the nectar of the Guru's feet will go to hell and become dogs birth after birth.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 20"
	},
	{
		id: 208,
		text: "गुरु को मानुष जानते, ते नर कहिये अंध।\nहोय दुखी संसार में, आगे जम का फंद॥",
		meaning: "Those who consider the Guru merely human are to be called blind. They suffer in the world, and ahead lies Yama's noose.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 21"
	},
	{
		id: 209,
		text: "गुरु बिन ज्ञान न उपजे, गुरु बिन मिलें न भेद।\nगुरु बिन संशय ना मिटे, जय जय जय गुरुदेव॥",
		meaning: "Without the Guru knowledge does not arise; without the Guru the mystery is not found. Without the Guru doubt does not disappear—victory, victory, victory to Gurudev.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 22"
	},
	{
		id: 210,
		text: "गुरु बिन ज्ञान न ऊपजे, गुरु बिन मिलें न मोष।\nगुरु बिन लखै न सत्य को, गुरु बिन मिटे न दोष॥",
		meaning: "Without the Guru knowledge does not arise, and without the Guru liberation is not found. Without the Guru truth is not perceived, and without the Guru faults are not erased.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 23"
	},
	{
		id: 211,
		text: "गुरु नारायण रूप है, गुरु ज्ञान को घाट।\nसतगुरु वचन प्रताप सों, मन के मिटे उचाट॥",
		meaning: "The Guru is the form of Narayan and the landing-place of knowledge. Through the power of the Satguru's words, the mind's restlessness is erased.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 24"
	},
	{
		id: 212,
		text: "गुरु महिमा गावत सदा, मन अति राखे मोद।\nसो भव फिरि आवे नहीं, बैठे प्रभु की गोद॥",
		meaning: "The one who always sings the Guru's greatness and keeps the mind deeply joyful does not return again to worldly becoming, but sits in Prabhu's lap.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 25"
	},
	{
		id: 213,
		text: "गुरु सेवा जन बंदगी, हरि सुमिरन वैराग।\nये चारों तबहीं मिलें, पूरन होवै भाग॥",
		meaning: "Service to the Guru, reverence to saints, remembrance of Hari and detachment—these four are obtained only when one's fortune becomes complete.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 26"
	},
	{
		id: 214,
		text: "गुरु मुक्तवै जीव को, चौरासी बद छोर।\nभक्ति प्रवाना देहि गुरु, जम सों तिनका तोर॥",
		meaning: "The Guru frees the living being, releasing it from the bonds of the eighty-four lakh forms. The Guru gives the warrant of devotion and breaks its tie with Yama.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 27"
	},
	{
		id: 215,
		text: "गुरु सों प्रीति निवाहिये, जिहि तत निबहै संत।\nप्रेम बिना ढिंग दूर है, प्रेम निकट गुरु कंत॥",
		meaning: "Sustain love for the Guru in the way saints sustain that truth. Without love the Guru is distant even when near; through love the beloved Guru is near.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 28"
	},
	{
		id: 216,
		text: "गुरु की महिमा को कहै, शिव विरंचि नहिं जान।\nगुरु सतगुरु को चीन्हिकै, पावै पद निरबान॥",
		meaning: "Who can describe the Guru's greatness? Even Shiva and Brahma do not know it. Recognising the Guru as Satguru, one attains the state of nirvana.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 30"
	},
	{
		id: 217,
		text: "गुरु मुख बानी उचरे, शीष सांच कर मान।\nया विधि फंदा छूटहीं, और युक्ति नहिं आन॥",
		meaning: "Whatever speech comes from the Guru's mouth, the disciple should accept as true. In this way the snare is released; there is no other method.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 31"
	},
	{
		id: 218,
		text: "गुरु मूरति गति चंद्रमा, सेवक नैन चकोर।\nआठ पहर निरखत रहे, गुरु मूरति की ओर॥",
		meaning: "The Guru's form is like the moon, and the servant's eyes like the chakor bird. Through all eight watches of the day, they keep gazing toward the Guru's form.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 32"
	},
	{
		id: 219,
		text: "गुरु समाना शीष में, शीष लिया करि नेह।\nबिलगाये बिलगै नहीं, एक प्रान दुइ देह॥",
		meaning: "The Guru entered the disciple, and the disciple was lovingly taken in by the Guru. Even if separated, they are not separate: one life in two bodies.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 33"
	},
	{
		id: 220,
		text: "गुरु मारै गुरु झटकरै, गुरु बोरे गुरु तार।\nगुरु सों प्रीति निबाहिये, गुरु हैं भव कड़िहार॥",
		meaning: "Whether the Guru strikes, rebukes, sinks or carries one across, sustain love for the Guru; the Guru is the boatman across worldly existence.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 29"
	},
	{
		id: 221,
		text: "गुरु शरणागत छोड़िकै, करै भरोसा और।\nसुख संपत की कह चली, नहीं नरक में ठौर॥",
		meaning: "One who leaves the Guru's refuge and places trust elsewhere gains neither happiness nor wealth, and has no resting place even in hell.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 34"
	},
	{
		id: 222,
		text: "गुरु मूरति आगे खड़ी, दुतिय भेद कछु नाँहि।\nउन्हीं कूँ परनामकरि, सकल तिमिर मिटि जाहि॥",
		meaning: "The Guru's form stands before you; there is no second distinction. Bowing to that very one, all darkness is erased.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 35"
	},
	{
		id: 223,
		text: "ज्ञान प्रकासी गुरु मिला, सो जनि विसरौं जाय।\nजब गोविन्द किरपा करी, तब गुरु मिलिया आय॥",
		meaning: "When a Guru who illumines knowledge is found, never forget that Guru. When Govind showed grace, the Guru then came to meet me.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 36"
	},
	{
		id: 224,
		text: "ज्ञान समागम प्रेम सुख, दया भक्ति विश्वास।\nगुरु सेवा ते पाइये, सद्गुरु चरण निवास॥",
		meaning: "Knowledge, good company, the joy of love, compassion, devotion and trust are obtained through service to the Guru and dwelling at the Satguru's feet.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 37"
	},
	{
		id: 225,
		text: "कबीर ते नर अंध हैं, गुरु को कहते और।\nहरि के रूठे ठौर है, गुरु रूठे नहिं ठौर॥",
		meaning: "Kabir Saheb says: those people are blind who regard the Guru as other. If Hari is displeased there is refuge, but if the Guru is displeased there is none.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 38"
	},
	{
		id: 226,
		text: "कबीर हरि के रूठते, गुरु के शरणें जाय।\nनहिं कबीर गुरु रूठते, हरि नहिं होत सहाय॥",
		meaning: "Kabir Saheb says: when Hari is displeased, go to the Guru's refuge; but when the Guru is displeased, Hari does not become a helper.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 39"
	},
	{
		id: 227,
		text: "हरि रूठे गति एक है, गुरु शरणागत जाय।\nगुरु रूठे एको नहीं, हरि नहिं करै सहाय॥",
		meaning: "If Hari is displeased, there is one course: go into the Guru's refuge. If the Guru is displeased, there is no course at all, and Hari does not help.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 40"
	},
	{
		id: 228,
		text: "कबीर गुरु के गम कहा, भेद दिया अरथाय।\nसुरति कंवल के अंतरै, निराधार पद पाय॥",
		meaning: "Kabir Saheb explained the Guru's path and disclosed its meaning: within the lotus of awareness, the unsupported state is attained.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 41"
	},
	{
		id: 229,
		text: "बलिहारी गुरु आपकी, घरी घरी सौ बार।\nमानुष ते देवता किया, करत न लागी बार॥",
		meaning: "I offer myself to you, Guru, a hundred times each moment. You transformed a human into a divine being, and it took no time at all.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 42"
	},
	{
		id: 230,
		text: "सिष खांड़ा गुरु मसकला, चढ़े सब्द खरसान।\nसब्द सहै सनमुख रहे, निपजै सीष सुजान॥",
		meaning: "The disciple is a sword and the Guru the whetstone; the Word is applied as the sharpening edge. The disciple who endures the Word and remains face-to-face emerges wise.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 43"
	},
	{
		id: 231,
		text: "भली भई जो गुरु मिले, नातर होती हानि।\nदीपक जोति पतंग ज्यों, पड़ता आय निदान॥",
		meaning: "It was well that the Guru was found; otherwise there would have been harm. Like a moth drawn to a lamp's flame, one would finally have fallen into it.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 44"
	},
	{
		id: 232,
		text: "भली भई जो गुरु मिलें, जाते पाया ज्ञान।\nघट ही माहिं चबूतरा, घट ही माहिं दिवान॥",
		meaning: "It was well that the Guru was found, through whom knowledge was received. Within this very vessel is the platform, and within this very vessel is the court.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 45"
	},
	{
		id: 233,
		text: "रामनाम के पटतरै, देवै को कछु नाहिं।\nकहले गुरु संतोषिये, हवस रही मन माहिं॥",
		meaning: "There is nothing that can be given equal to Ram's Name. Satisfy the Guru with words, while the longing remains within the mind.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 46"
	},
	{
		id: 234,
		text: "निज मनमाना नाम सों, नजरि न आवै दास।\nकहैं कबीर सो क्यों करै, राम मिलन की आस॥",
		meaning: "One who follows the mind's own will does not appear as a servant of the Name. Kabir Saheb says: how can such a person hope to meet Ram?",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 47"
	},
	{
		id: 235,
		text: "निज मन सों नीचा किया, चरण कमल की ठौर।\nकहैं कबीर गुरुदेव बिन, नजरि न आवै और॥",
		meaning: "I made myself lowly within my own mind and took my place at the lotus feet. Kabir Saheb says: apart from Gurudev, no other comes into view.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 48"
	},
	{
		id: 236,
		text: "तन मन दिया तो भल किया, सिर का जासी भार।\nजो कबहुँ कहै मैं दिया, बहुत सहै सिर मार॥",
		meaning: "If you gave body and mind, you did well, for the burden upon your head will go. But if you ever say, 'I gave,' you will endure many blows upon that head.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 49"
	},
	{
		id: 237,
		text: "तन मन ताको दीजिये, जाको विषया नाहिं।\nआपा सब ही डारि के, राखे साहिब माहिं॥",
		meaning: "Give body and mind to the one who has no attachment to sense-objects, who casts away the entire self and keeps it in the Sahib.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 50"
	},
	{
		id: 238,
		text: "ऐसा कोई ना मिला, राम नाम को मीत।\nतन मन सौंपे मिरग ज्यों, सुने बधिक की गीत॥",
		meaning: "I found no one who is truly a friend of Ram's Name, surrendering body and mind like a deer that listens to the hunter's song.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 51"
	},
	{
		id: 239,
		text: "जल परमाने माछली, कुल परमाने सुद्धि।\nजाको जैसा गुरु मिला, ताको तैसी बुद्धि॥",
		meaning: "A fish is measured by its water, and purity by its lineage. As is the Guru one finds, so becomes one's understanding.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 52"
	},
	{
		id: 240,
		text: "जैसी प्रीति कुटुंब की, तैसी गुरु सों होय।\nकहैं कबीर ता दास का, पला न पकड़े कोय॥",
		meaning: "If one's love for the Guru is like one's love for family, Kabir Saheb says: no one can seize the hem of such a servant.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 53"
	},
	{
		id: 241,
		text: "सब धरती कागद करूँ, लिखनी सब बनराय।\nसात समुंद की मसि करूँ, गुरु गुन लिखा न जाय॥",
		meaning: "Were I to make all the earth into paper, every forest into pens and the seven seas into ink, the Guru's virtues still could not be written.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 54"
	},
	{
		id: 242,
		text: "बूड़ा था पर ऊबरा, गुरु की लहरी चमक्क।\nबेड़ा देखा झाँझरा, उतरी भया फरक्क॥",
		meaning: "I was drowning but rose up when the Guru's wave flashed. Seeing the boat full of holes, I got off and became free of it.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 55"
	},
	{
		id: 243,
		text: "अहं अगनि निश दिन जरै, गुरु सों चाहे मान।\nताको जम न्यौता दिया, होउ हमार मिहमान॥",
		meaning: "One who burns day and night in the fire of ego yet seeks honour from the Guru has been invited by Yama: come, be my guest.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 56"
	},
	{
		id: 244,
		text: "जम गरज बल बाघ के, कहैं कबीर पुकार।\nगुरु किरपा ना होत जो, तो जम खाता फार॥",
		meaning: "Yama roars with a tiger's strength. Kabir Saheb cries out: had the Guru's grace not been there, Yama would have torn me open and devoured me.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 57"
	},
	{
		id: 245,
		text: "अबर न बरन अमूर्त जो, कहो ताहि किन पेख।\nगुरु दया ते पावई, सुरति निरति करि देखा॥",
		meaning: "That which has neither covering nor colour and is formless—tell me, who has seen it? It is attained through the Guru's grace; behold it by joining attentive awareness and absorption.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 58"
	},
	{
		id: 246,
		text: "पंडित पढ़ि गुनि पचि मुये, गुरु बिन मिले न ज्ञान।\nज्ञान बिना नाहिं मुक्ति है, सत्त सब्द परमान॥",
		meaning: "Scholars read, reasoned and died exhausted, but without the Guru knowledge was not found. Without knowledge there is no liberation; the true Word is the proof.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 59"
	},
	{
		id: 247,
		text: "मूल ध्यान गुरु रूप है, मूल पूजा गुरु पाँव।\nमूल नाम गुरु बचन है, मूल सत्य सत भाव॥",
		meaning: "The root of meditation is the Guru's form; the root of worship is the Guru's feet. The root of the Name is the Guru's word; the root of truth is the true disposition.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 60"
	},
	{
		id: 248,
		text: "कहैं कबीर तजि भरम को, नन्हा ह्वै करि पीव।\nतजि अहं गुरु चरण गहु, जम सों बाचे जीव॥",
		meaning: "Kabir Saheb says: abandon delusion, become small and drink. Abandon ego and grasp the Guru's feet; then the living being is saved from Yama.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 61"
	},
	{
		id: 249,
		text: "तीन लोक नव खंड में, गुरु ते बड़ा न कोय।\nकरता करै न करि सकै, गुरु करै सो होय॥",
		meaning: "In the three worlds and nine regions, none is greater than the Guru. What the Creator does may fail to happen; what the Guru does comes to pass.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 62"
	},
	{
		id: 250,
		text: "कोटिन चंदा ऊगहीं, सूरज कोटि हजार।\nतीमिर तो नाशैं नहीं, बिन गुरु घोर अँधार॥",
		meaning: "Millions of moons may rise and thousands of millions of suns, yet the darkness is not destroyed; without the Guru there is dense darkness.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 63"
	},
	{
		id: 251,
		text: "पहिले बुरा कमाइ के, बाँधी विष की पोट।\nकोटि करम पल में कटें, जब आया गुरु की ओट॥",
		meaning: "Having first committed evil, one tied up a bundle of poison. Millions of deeds are cut away in a moment when one comes under the Guru's shelter.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 64"
	},
	{
		id: 252,
		text: "जगत जनायो सकल जिहि, सो गुरु प्रगटे आय।\nजिन गुरु आँखिन देखिया, सो गुरु दिया लखाय॥",
		meaning: "The one who made the whole world known appeared as the Guru. The Guru whom these eyes beheld revealed that very one.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 65"
	},
	{
		id: 253,
		text: "हरि किरपा तब जानिये, दे मानव अवतार।\nगुरु किरपा तब जानिये, छुड़ावे संसार॥",
		meaning: "Know Hari's grace when a human birth is given; know the Guru's grace when one is released from the world.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 66"
	},
	{
		id: 254,
		text: "जाके शिर गुरु ज्ञान है, सोइ तरत भव माँहि।\nगुरु बिन जानो जन्तु को, कबहुँ मुक्ति सुख नाँहि॥",
		meaning: "The one upon whose head rests the Guru's knowledge crosses worldly existence. Know that without the Guru a creature never has the joy of liberation.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 67"
	},
	{
		id: 255,
		text: "देवी बड़ा न देवता, सूरज बड़ा न चन्द।\nआदि अंत दोनों बड़े, कै गुरु कै गोविन्द॥",
		meaning: "Neither goddess nor god is greatest, neither sun nor moon. From beginning to end, these two are great: the Guru and Govind.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 68"
	},
	{
		id: 256,
		text: "सब कुछ गुरु के पास है, पाइये अपने भाग।\nसेवक मन सौंपे रहे, निशदिन चरणों लाग॥",
		meaning: "Everything is with the Guru and is received according to one's fortune. Let the servant keep the mind surrendered and remain at the Guru's feet night and day.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 69"
	},
	{
		id: 257,
		text: "बहुत गुरु भै जगत में, कोई न लागे तीर।\nसबै गुरु बहि जायेंगे, जाग्रत गुरु कबीर॥",
		meaning: "Many gurus have appeared in the world, yet none reaches the farther shore. All those gurus will be swept away; the awakened Guru is Kabir Saheb.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 70"
	},
	{
		id: 258,
		text: "वेद पुराना साधु गुरु, सबन कही निज बात।\nगुरु ते अधिक न दूसरा, का हरि का पितु मात॥",
		meaning: "The Vedas, Puranas, holy people and gurus have each stated their own view: none is greater than the Guru—not Hari, father or mother.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 71"
	},
	{
		id: 259,
		text: "ताते शब्द विवेक करि, कीजै ऐसो साज।\nजिहि विधि गुरु सों प्रीति रह, कीजै सोई काज॥",
		meaning: "Therefore discern the Word and make such an arrangement: perform only that action by which love for the Guru remains.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 72"
	},
	{
		id: 260,
		text: "सोइ सोइ नाच नचाइये, जिहि निबहै गुरु प्रेम।\nकहैं कबीर गुरु प्रेम बिन, कितहुँ कुशल नहिं छेम॥",
		meaning: "Dance whatever dance allows love for the Guru to endure. Kabir Saheb says: without love for the Guru, there is no welfare or safety anywhere.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 73"
	},
	{
		id: 261,
		text: "तन मन सीष निछावरै, दीजै सरबस प्रान।\nकहैं कबीर दुख सुख सहै, सदा रहै गलतान॥",
		meaning: "Offer body, mind and head, and give everything, even life. Kabir Saheb says: endure sorrow and joy, remaining always absorbed.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 74"
	},
	{
		id: 262,
		text: "तब ही गुरु प्रिय बैन कहि, सीष बढ़ी चित प्रीत।\nतो रहिये गुरु सनमुखाँ, कबहुँ न दीजै पीठ॥",
		meaning: "Only then does the Guru speak loving words and the disciple's love grows in the heart. Therefore remain facing the Guru and never turn your back.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 75"
	},
	{
		id: 263,
		text: "स्नेह प्रेम गुरु चरण सों, जिहि प्रकार से होय।\nक्या नियरै क्या दूर सब, प्रेम भक्त सुख सोय॥",
		meaning: "Let affection and love for the Guru's feet arise in whatever way they may. Whether near or far, all the joy lies in loving devotion.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 76"
	},
	{
		id: 264,
		text: "जिहि विधि सिष को मन बसै, गुरु पद परम सनेह।\nकहैं कबीर क्या फरक ढिंग, क्या परबत बन गेह॥",
		meaning: "When the disciple's mind dwells in supreme love for the Guru's feet, Kabir Saheb says: what difference is there between being nearby and being on a mountain, in a forest or at home?",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 77"
	},
	{
		id: 265,
		text: "जो गुरु पूरा होय तो, शीषहि लेय निबाह।\nशीषभाव सुत जानिये, सुत ते श्रेष्ठ शिष आह॥",
		meaning: "If the Guru is complete, the Guru sustains the disciple. Regard the disciple's feeling as that of a child; a disciple is said to be greater than a child.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 78"
	},
	{
		id: 266,
		text: "अबुध सुबुध सुत मातु पितु, सबहि करै प्रतिपाल।\nअपनी ओर निबाहिये, सिख सुत गहि निज चाल॥",
		meaning: "Parents care for every child, unwise or wise. From your own side, sustain the disciple as a child, holding to your own way.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 79"
	},
	{
		id: 267,
		text: "सुनिये संतो साधु मिलि, कहहिं कबीर बुझाय।\nजिहि विधि गुरु सों प्रीति है, कीजै सोइ उपाय॥",
		meaning: "Listen, saints, having met with holy people; Kabir Saheb explains: use whatever means preserves love for the Guru.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 80"
	},
	{
		id: 268,
		text: "करै दूरि अज्ञानता, अंजन ज्ञान सुदेय।\nबलिहारी वे गुरुन की, हंस उबारि जु लेय॥",
		meaning: "The Guru drives ignorance away and gives the fine collyrium of knowledge. I offer myself to those Gurus who rescue the swan-like soul.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 81"
	},
	{
		id: 269,
		text: "हरि सेवा युग चार है, गुरु सेवा पल एक।\nताके पटतर ना तुलै, संतन कियो विवेक॥",
		meaning: "Service to Hari for all four ages does not equal one moment of service to the Guru; the saints have made this discernment.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 82"
	},
	{
		id: 270,
		text: "ते मन निर्मल सतखरा, जो गुरु सों लागे हेत।\nअंकुर सोई ऊगसी, गुरु शब्दें बोया खेत॥",
		meaning: "That mind is pure and truly genuine which has love for the Guru. The very seedling will sprout that was sown in the field by the Guru's Word.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 83"
	},
	{
		id: 271,
		text: "भौसागर की त्रास ते, गुरु की पकड़ो बाँहि।\nगुरु बिन कौन उबारसी, भौजल धारा माँहि॥",
		meaning: "From fear of the ocean of worldly existence, grasp the Guru's arm. Without the Guru, who will rescue you amid the current of worldly waters?",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 84"
	},
	{
		id: 272,
		text: "लौ लागी विष भागिया, कालख डारी धोय।\nकहैं कबीर गुरु साबुन सों, कोइ इक उज्जल होय॥",
		meaning: "When devotion took hold, poison fled and the black stain was washed away. Kabir Saheb says: only a rare one becomes bright through the Guru-soap.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 85"
	},
	{
		id: 273,
		text: "साबुन बिचारा क्या करै, गाँठे राखे मोय।\nजल सों अरसा परस नहिं, क्योंकर उज्जल होय॥",
		meaning: "What can the poor soap do if the cloth is kept tied in a knot? If it does not touch water for a long time, how can it become clean?",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 86"
	},
	{
		id: 274,
		text: "नारद सरिखा सीष है, गुरु है मच्छी मार।\nता गुरु की निन्दा करै, पड़ै चौरासी धार॥",
		meaning: "The disciple is like Narad, while the Guru is a fisherman. If the disciple slanders that Guru, the disciple falls into the stream of the eighty-four lakh births.",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 87"
	},
	{
		id: 275,
		text: "राजा की चोरी करै, रहै रंक की ओट।\nकहैं कबीर क्यों उबरै, काल कठिन की चोट॥",
		meaning: "One steals from the king and then shelters behind a pauper. Kabir Saheb says: how can such a person escape the harsh blow of death?",
		source: "सद्गुरु कबीर की साखी — गुरुदेव को अंग, साखी 88"
	}
];
