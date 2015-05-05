// simpleTextSteg.js
// https://github.com/5kbps/simpleTextSteg


function stegTextDecode(text, separator = ";/!"){
	stegSymbolsEN = "aceoyABCEHMOPTX"
	stegSymbolsRU = "асеоуАВСЕНМОРТХ"
	charArray = "`1234567890qwertyuiopasdfghjklzxcvbnmабвгдежзийклмнопрстуфхцчшщъ"+
				 "ыьэюяQWERTYUIOPASDFGHJKLZXCVBNMАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ "
	mCharArray= "`!@#$%^&*()-=_+[]\\{}|;':\",./<>?№"
	stegPattern = ""
	for( i in text ){
		s = text[i]
		if( stegSymbolsEN.indexOf(s) != -1 ){
			stegPattern += '0'
		}
		if( stegSymbolsRU.indexOf(s) != -1 ){
			stegPattern += '1'
		}
	}
	r = ""
	for( var i = 0; i < stegPattern.length - stegPattern.length % 7; i+=7){
		s = stegPattern.substr(i,7)
		n = parseInt( s, 2 );
		if(n != 0){
			c = charArray[n]
		}else{
			i += 7
			ms = stegPattern.substr(i,7)
			mn = parseInt(ms,2)
			if(mn < mCharArray.length){
				c = mCharArray[mn]
			}else{
				c = ""
			}
		}
		r += c
	}
	console.log(stegPattern)
	if(r.indexOf(separator)!= -1){
		return r.split(separator)[0]
	}else{
		return 0
	}
}

function stegTextEncode(message,text, separator = ";/!"){
	message += separator
	function normalizeLength(string){
		while(string.length < 7){
			string = "0"+string
		}
		return string
	}
	function toBin(string){
		return normalizeLength( (+string).toString(2) )
	}
	stegSymbolsEN = "aceoyABCEHMOPTX"
	stegSymbolsRU = "асеоуАВСЕНМОРТХ"
	charArray = "`1234567890qwertyuiopasdfghjklzxcvbnmабвгдежзийклмнопрстуфхцчшщъ"+
				 "ыьэюяQWERTYUIOPASDFGHJKLZXCVBNMАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ "
	mCharArray= "`!@#$%^&*()-=_+[]\\{}|;':\",./<>?№"
	stegPattern = ""
	for( i in message ){
		c = message[i]
		if( charArray.indexOf(c) != -1 ){
			stegPattern += normalizeLength( charArray.indexOf(c).toString(2) )
		}else if(mCharArray.indexOf(c) != -1 ){
			stegPattern += "0000000"+normalizeLength( (+mCharArray.indexOf(c)).toString(2))
		}
	}
	console.log(stegPattern)
	r = ""
	n = 0
	for( i in text){
		c = text[i]
		if( stegSymbolsEN.indexOf(c) != -1){
			if(stegPattern[n]=="0"){
				r += c
				n++
			}else{
				r += stegSymbolsRU[ stegSymbolsEN.indexOf(c) ]
				n++
			}
		}else if( stegSymbolsRU.indexOf(c) != -1){
			if(stegPattern[n]=="0"){
				r += stegSymbolsEN[ stegSymbolsRU.indexOf(c) ]
				n++
			}else{
				r += c
				n++
			}
		}else{
			r += c
		}
	}
	if(n >= stegPattern.length){
		return r
	}else{
		return 0
	}
}

// example:
// stegTextDecode( stegTextEncode("This is a hidden text message"," This is a masking text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit urna eu tempus pulvinar. Curabitur nec dapibus odio, ut vestibulum ligula. Pellentesque malesuada dapibus vestibulum. Phasellus velit leo, sollicitudin eget sollicitudin suscipit, consequat ut nulla. Phasellus non quam egestas, efficitur urna at, dignissim eros. Sed consequat est velit, ut placerat ex bibendum a. Nulla facilisi. Curabitur dapibus laoreet tempor. Nulla feugiat maximus turpis. Vestibulum in eleifend enim, sit amet sagittis ipsum. Maecenas suscipit purus sed volutpat varius. Quisque aliquet risus urna, nec cursus ante rutrum auctor. Maecenas pretium libero augue. Praesent auctor lacus in nulla posuere placerat. Maecenas sit amet vehicula mi. In sit amet aliquam turpis. Aliquam erat volutpat. Nullam viverra vel enim eu euismod. Cras dignissim, ligula eu semper mattis, magna dolor auctor massa, sit amet ultricies libero quam sed nisl. Quisque neque lorem, dapibus in ornare sed, lacinia sed augue. Nunc interdum facilisis commodo. Pellentesque consequat arcu sit amet risus gravida, nec fermentum tellus commodo. Pellentesque ante dolor, dapibus a dui sit amet, blandit tempor nibh. Sed tempor eget magna at pretium. Duis dignissim lorem at enim malesuada laoreet. Ut vehicula, sapien quis sagittis porttitor, augue orci sodales erat, sed convallis nisi nibh et diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor at metus sit amet sodales. Maecenas non lorem quis justo varius lacinia iaculis eu orci. In ullamcorper leo et ultrices ornare. Fusce ac leo pellentesque, elementum turpis sit amet, rhoncus nulla. Morbi ornare, sapien ac convallis euismod, metus felis interdum leo, sit amet auctor sem orci eu justo. In eget vehicula odio. Ut libero dui, porttitor eu tellus vel, vehicula volutpat diam. Quisque vitae rhoncus lacus, eu posuere metus. Duis non eros Donec sed sollicitudin nisl, et aliquet diam. In vestibulum elit et risus cursus laoreet. Integer quis lacus hendrerit, condimentum libero vitae, dictum massa. Phasellus in aliquam enim, nec accumsan nunc. Aliquam aliquam volutpat felis, ac varius tellus pellentesque quis. Quisque at finibus neque. Aliquam enim justo, iaculis vel odio ut, aliquam luctus urna. Donec ullamcorper eget dui ut varius. Pellentesque quis porttitor orci, a sollicitudin libero. Curabitur imperdiet orci sed dui cursus efficitur in at massa. Maecenas eget nunc id dolor elementum molestie vel ut tellus. Phasellus maximus sit amet leo nec convallis. Curabitur interdum, neque in blandit euismod, sapien ipsum pellentesque quam, eu suscipit massa felis vel felis.Cras finibus elementum dictum. Nulla bibendum volutpat est eget consectetur. Donec sed volutpat nulla, a tempor risus. Nulla facilisi. Integer sollicitudin sagittis faucibus. Pellentesque ut egestas sem. Proin est eros, laoreet id leo ac, fermentum luctus augue. Nulla pharetra ex mollis, auctor erat eu, condimentum sem. Vestibulum posuere libero et felis sodales sagittis. Nunc hendrerit ligula sit amet molestie lobortis. Fusce sit amet pretium sapien. Morbi imperdiet, odio ut dapibus euismod, diam mi aliquet sem, a congue dui risus at erat. Donec odio libero, condimentum eget ultricies eget, feugiat ac risus. Nulla facilisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum lorem et faucibus euismod. Sed ullamcorper faucibus mauris vel ullamcorper. Aenean at bibendum felis. Nulla viverra, nisi non cursus vulputate, elit nisl commodo orci, eu aliquet enim enim id arcu. Donec tellus nibh, consequat eget odio in, commodo tristique tortor. Nunc malesuada dui consequat eros ornare, a euismod arcu posuere. Aliquam erat volutpat.Donec scelerisque dignissim risus. In hac habitasse platea dictumst. In hac habitasse platea dictumst. Nullam sollicitudin ante ac arcu tristique, quis facilisis nunc dictum. In sed rhoncus ante. Nulla id dictum leo. Cras sagittis mollis maximus. Integer ut sem dui.Curabitur in nunc egestas, suscipit massa et, pulvinar arcu. Maecenas blandit, neque at faucibus aliquam, metus diam mollis lacus, ut sodales turpis nulla non erat. Morbi auctor porttitor lorem, vitae vulputate velit semper in. Maecenas odio orci, euismod id ullamcorper at, luctus sed neque. Cras in sagittis nisl, sit amet eleifend tellus. Phasellus ut sagittis lectus. Proin nunc quam, posuere a elit a, euismod condimentum arcu. Cras congue tellus sem, eu pretium tortor molestie ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed mollis ullamcorper ipsum, a pretium nulla tristique id. Nullam accumsan tempus tortor rutrum volutpat. Aenean in vehicula orci, ac tincidunt nisi. Proin non eleifend est.Nulla nec auctor risus. Proin eget blandit nulla. Mauris fringilla tortor nibh, et lobortis tellus accumsan ut. Praesent id dolor erat. Cras eget turpis a velit scelerisque consectetur vitae ac dolor. Aliquam vestibulum ante at posuere imperdiet. Praesent sodales porttitor nibh, aliquet eleifend erat rhoncus at. Aliquam pellentesque, odio vitae sodales aliquam, metus libero venenatis sem, et aliquam massa magna id nulla. Mauris non efficitur massa. Sed gravida libero pellentesque sem sodales, quis cursus neque condimentum. Pellentesque efficitur quam euismod nunc aliquet, sed dignissim nulla ultricies. Duis fringilla, elit a facilisis euismod, dolor dui efficitur odio, ut ullamcorper est ante at sapien. Fusce nisl nulla, tempus vel eros eu, vehicula bibendum magna. Sed consequat, mi eu accumsan imperdiet, quam libero elementum turpis, et ultrices purus nibh eget augue. Mauris facilisis sed tortor ac tincidunt. Vivamus mi risus, cursus sed malesuada ac, ullamcorper sed diam.Ut ornare maximus sem, sit amet ornare justo euismod sagittis. Nunc gravida hendrerit mi, ut vulputate felis. Sed finibus in ligula ac porttitor. Fusce purus libero, pretium eget condimentum ac, porttitor elementum odio. Etiam ac lacus eget sem mollis scelerisque id nec mi. Integer malesuada tincidunt ligula, at aliquet magna ornare at. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam maximus tempus tincidunt. Aliquam ex augue, suscipit eu feugiat ut, varius semper lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed mi tortor, vulputate eget lorem in, malesuada lacinia velit. Integer auctor ultricies congue. Donec pulvinar eleifend justo a suscipit. Ut in tortor tellus. Ut varius ligula eget odio consectetur ullamcorper.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum nec turpis placerat, consectetur arcu et, egestas libero. Vivamus dignissim, metus eget rutrum tempus, purus arcu fermentum velit, a pretium leo felis eu eros. Nullam lacinia, felis et lobortis dictum, nisl sapien commodo nisl, vel lacinia leo est quis ex. Donec id sapien non ipsum consectetur placerat ac eget est. In hac habitasse platea dictumst. Sed ut dui ac felis efficitur laoreet. Integer a erat eu tortor imperdiet blandit id ac ante. Ut ultrices urna quis neque laoreet, sed dictum libero euismod."))