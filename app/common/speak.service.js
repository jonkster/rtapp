"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var dialogs_1 = require("ui/dialogs");
var CommonSpeakService = /** @class */ (function () {
    function CommonSpeakService() {
        this.lang = 'en-AU';
        this.rate = 1;
        this.volume = 1;
        this.isSpeaking = false;
        this.phraseCache = [];
        this.speechOn = false;
        this.TTS = new nativescript_texttospeech_1.TNSTextToSpeech();
        this.volume = 2;
        this.speak('Throttle set');
        //this.speak('Contact!');
        var t = this;
        setInterval(function () {
            t.volume = 1;
            t.speakNext();
        }, 500);
    }
    CommonSpeakService.prototype.showLangs = function () {
        var l = this.TTS.getAvailableLanguages();
        l.then(function (a) { console.log(a); });
    };
    CommonSpeakService.prototype.setRate = function (r) {
        this.rate = r;
    };
    CommonSpeakService.prototype.setSpeech = function (on) {
        this.speechOn = on;
    };
    CommonSpeakService.prototype.setLang = function (lang) {
        this.lang = lang;
        //language: 'en-GBR'
        //language: 'ita-ITA'
        //language: 'rus-RUS'
        //language: 'por-BRA'
        //language: 'en-USA'
    };
    CommonSpeakService.prototype.speak = function (text) {
        var phrases = text.split(/,,*/);
        for (var i = 0; i < phrases.length; i++) {
            this.phraseCache.push(phrases[i]);
        }
    };
    CommonSpeakService.prototype.finishedSpeaking = function () {
        this.isSpeaking = false;
    };
    CommonSpeakService.prototype.speakNext = function () {
        var _this = this;
        if (this.isSpeaking) {
            return;
        }
        if (this.phraseCache.length > 0) {
            if (this.speechOn) {
                this.isSpeaking = true;
                var text = this.phraseCache.shift();
                text = text.replace(/CAVOK/, 'CAV O K');
                text = text.replace(/\bnine\b/ig, 'niner');
                text = text.replace(/\bfive\b/ig, 'fife');
                var siht = this;
                var spkOptions = {
                    text: text,
                    speakRate: this.rate,
                    volume: this.volume,
                    language: this.lang,
                    finishedCallback: (function () { _this.finishedSpeaking(); })
                };
                console.log(text);
                if (this.speechOn) {
                    this.TTS.speak(spkOptions).then(function () { }, function (err) {
                        console.log('error speaking', err);
                    });
                }
            }
            else {
                var text = this.phraseCache.join("\n");
                this.phraseCache = [];
                var options = {
                    title: "Silent...",
                    message: text,
                    okButtonText: "OK"
                };
                dialogs_1.alert(options).then(function () { });
            }
        }
    };
    CommonSpeakService.prototype.alphabet = function (ch) {
        ch = ch.toLowerCase();
        var phon = {
            'a': 'ALPHA',
            'b': 'BRAVO',
            'c': 'CHARLIE',
            'd': 'DELTA',
            'e': 'ECHO',
            'f': 'FOXTROT',
            'g': 'GOLF',
            'h': 'HOTEL',
            'i': 'INDIA',
            'j': 'JULIET',
            'k': 'KILO',
            'l': 'LIMA',
            'm': 'MIKE',
            'n': 'NOVEMBER',
            'o': 'OSCAR',
            'p': 'PUP PAR',
            'q': 'QUEBEC',
            'r': 'ROMEO',
            's': 'SIERRA',
            't': 'TANGO',
            'u': 'UNIFORM',
            'v': 'VICTA',
            'w': 'WHISKEY',
            'x': 'X RAY',
            'y': 'YANKEE',
            'z': 'ZULU',
            '0': 'ZERO',
            '1': 'WUN',
            '2': 'TWO',
            '3': 'THREE',
            '4': 'FORE',
            '5': 'FIFE',
            '6': 'SIX',
            '7': 'SEFFEN',
            '8': 'EIGHT',
            '9': 'NINER'
        };
        if (phon[ch] !== undefined) {
            return phon[ch];
        }
        return ch;
    };
    CommonSpeakService.prototype.getPhonetic = function (c) {
        var st = [];
        var bits = c.split('');
        for (var i = 0; i < bits.length; i++) {
            st.push(this.alphabet(bits[i]));
        }
        return st.join(' ');
    };
    CommonSpeakService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CommonSpeakService);
    return CommonSpeakService;
}());
exports.CommonSpeakService = CommonSpeakService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYWsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwZWFrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsdUVBQTBFO0FBQzFFLHNDQUFtQztBQUduQztJQVVFO1FBUFEsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQUN2QixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSwyQ0FBZSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsV0FBVyxDQUFFO1lBQ1osQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sc0NBQVMsR0FBaEI7UUFDTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLG9DQUFPLEdBQWQsVUFBZSxDQUFTO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELHNDQUFTLEdBQVQsVUFBVSxFQUFXO1FBQ3BCLElBQUksQ0FBQyxR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QUUsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7SUFFRCx3Q0FBVyxHQUFYLFVBQVksQ0FBUztRQUNwQixJQUFJLEVBQUUsR0FBYSxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQXJKVSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTs7T0FDQSxrQkFBa0IsQ0F1SjlCO0lBQUQseUJBQUM7Q0FBQSxBQXZKRCxJQXVKQztBQXZKWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCwgU3BlYWtPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaCc7XG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb21tb25TcGVha1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgVFRTOiBUTlNUZXh0VG9TcGVlY2g7XG4gIHByaXZhdGUgbGFuZzogc3RyaW5nID0gJ2VuLUFVJztcbiAgcHJpdmF0ZSByYXRlOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIHZvbHVtZTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBpc1NwZWFraW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcGhyYXNlQ2FjaGU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc3BlZWNoT246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBcdHRoaXMuVFRTID0gbmV3IFROU1RleHRUb1NwZWVjaCgpO1xuXHR0aGlzLnZvbHVtZSA9IDI7XG5cdHRoaXMuc3BlYWsoJ1Rocm90dGxlIHNldCcpO1xuXHQvL3RoaXMuc3BlYWsoJ0NvbnRhY3QhJyk7XG5cdGxldCB0ID0gdGhpcztcblx0c2V0SW50ZXJ2YWwoICgpID0+IHtcblx0XHR0LnZvbHVtZSA9IDE7XG5cdFx0dC5zcGVha05leHQoKTtcblx0fSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TGFuZ3MoKSB7XG4gICAgICAgIGxldCBsID0gdGhpcy5UVFMuZ2V0QXZhaWxhYmxlTGFuZ3VhZ2VzKCk7XG5cdGwudGhlbigoYSkgPT4geyBjb25zb2xlLmxvZyhhKTsgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0UmF0ZShyOiBudW1iZXIpIHtcbiAgXHR0aGlzLnJhdGUgPSByO1xuICB9XG5cbiAgc2V0U3BlZWNoKG9uOiBib29sZWFuKSB7XG4gIFx0dGhpcy5zcGVlY2hPbiA9IG9uO1xuICB9XG5cbiAgcHVibGljIHNldExhbmcobGFuZzogc3RyaW5nKSB7XG4gIFx0dGhpcy5sYW5nID0gbGFuZztcblx0XHQvL2xhbmd1YWdlOiAnZW4tR0JSJ1xuXHRcdC8vbGFuZ3VhZ2U6ICdpdGEtSVRBJ1xuXHRcdC8vbGFuZ3VhZ2U6ICdydXMtUlVTJ1xuXHRcdC8vbGFuZ3VhZ2U6ICdwb3ItQlJBJ1xuXHRcdC8vbGFuZ3VhZ2U6ICdlbi1VU0EnXG4gIH1cblxuICBwdWJsaWMgc3BlYWsodGV4dDogc3RyaW5nKSB7XG4gIFx0bGV0IHBocmFzZXMgPSB0ZXh0LnNwbGl0KC8sLCovKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwaHJhc2VzLmxlbmd0aDsgaSsrKSB7XG4gIFx0XHR0aGlzLnBocmFzZUNhY2hlLnB1c2gocGhyYXNlc1tpXSk7XG5cdH1cbiAgfVxuXG4gIHB1YmxpYyBmaW5pc2hlZFNwZWFraW5nKCkge1xuICBcdHRoaXMuaXNTcGVha2luZyA9IGZhbHNlO1xuICB9XG5cblxuICBwcml2YXRlIHNwZWFrTmV4dCgpIHtcbiAgXHRpZiAodGhpcy5pc1NwZWFraW5nKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmICh0aGlzLnBocmFzZUNhY2hlLmxlbmd0aCA+IDApIHtcblx0XHRpZiAodGhpcy5zcGVlY2hPbikge1xuXHRcdFx0dGhpcy5pc1NwZWFraW5nID0gdHJ1ZTtcblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5waHJhc2VDYWNoZS5zaGlmdCgpO1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvQ0FWT0svLCAnQ0FWIE8gSycpO1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvXFxibmluZVxcYi9pZywgJ25pbmVyJyk7XG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXGJmaXZlXFxiL2lnLCAnZmlmZScpO1xuXHRcdFx0bGV0IHNpaHQgPSB0aGlzO1xuXHRcdFx0bGV0IHNwa09wdGlvbnM6IFNwZWFrT3B0aW9ucyA9IHtcblx0XHRcdFx0dGV4dDogdGV4dCxcblx0XHRcdFx0c3BlYWtSYXRlOiB0aGlzLnJhdGUsXG5cdFx0XHRcdHZvbHVtZTogdGhpcy52b2x1bWUsXG5cdFx0XHRcdGxhbmd1YWdlOiB0aGlzLmxhbmcsXG5cdFx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgoKT0+e3RoaXMuZmluaXNoZWRTcGVha2luZygpfSlcblx0XHRcdH07XG5cdFx0XHRjb25zb2xlLmxvZyh0ZXh0KTtcblx0XHRcdGlmICh0aGlzLnNwZWVjaE9uKSB7XG5cdFx0XHRcdHRoaXMuVFRTLnNwZWFrKHNwa09wdGlvbnMpLnRoZW4oXG5cdFx0XHRcdFx0XHQoKSA9PiB7IH0sXG5cdFx0XHRcdFx0KGVycikgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2Vycm9yIHNwZWFraW5nJywgZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5waHJhc2VDYWNoZS5qb2luKFwiXFxuXCIpO1xuXHRcdFx0dGhpcy5waHJhc2VDYWNoZSA9IFtdO1xuXHRcdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdHRpdGxlOiBcIlNpbGVudC4uLlwiLFxuXHRcdFx0XHRtZXNzYWdlOiB0ZXh0LFxuXHRcdFx0XHRva0J1dHRvblRleHQ6IFwiT0tcIlxuXHRcdFx0fTtcblx0XHRcdGFsZXJ0KG9wdGlvbnMpLnRoZW4oKCkgPT4geyB9KTtcblx0XHR9XG5cdH1cbiAgfVxuXG4gIGFscGhhYmV0KGNoOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgXHRjaCA9IGNoLnRvTG93ZXJDYXNlKCk7XG4gIFx0bGV0IHBob246IGFueSA9IHtcblx0XHQnYSc6ICdBTFBIQScsXG5cdFx0J2InOiAnQlJBVk8nLFxuXHRcdCdjJzogJ0NIQVJMSUUnLFxuXHRcdCdkJzogJ0RFTFRBJyxcblx0XHQnZSc6ICdFQ0hPJyxcblx0XHQnZic6ICdGT1hUUk9UJyxcblx0XHQnZyc6ICdHT0xGJyxcblx0XHQnaCc6ICdIT1RFTCcsXG5cdFx0J2knOiAnSU5ESUEnLFxuXHRcdCdqJzogJ0pVTElFVCcsXG5cdFx0J2snOiAnS0lMTycsXG5cdFx0J2wnOiAnTElNQScsXG5cdFx0J20nOiAnTUlLRScsXG5cdFx0J24nOiAnTk9WRU1CRVInLFxuXHRcdCdvJzogJ09TQ0FSJyxcblx0XHQncCc6ICdQVVAgUEFSJyxcblx0XHQncSc6ICdRVUVCRUMnLFxuXHRcdCdyJzogJ1JPTUVPJyxcblx0XHQncyc6ICdTSUVSUkEnLFxuXHRcdCd0JzogJ1RBTkdPJyxcblx0XHQndSc6ICdVTklGT1JNJyxcblx0XHQndic6ICdWSUNUQScsXG5cdFx0J3cnOiAnV0hJU0tFWScsXG5cdFx0J3gnOiAnWCBSQVknLFxuXHRcdCd5JzogJ1lBTktFRScsXG5cdFx0J3onOiAnWlVMVScsXG5cdFx0JzAnOiAnWkVSTycsXG5cdFx0JzEnOiAnV1VOJyxcblx0XHQnMic6ICdUV08nLFxuXHRcdCczJzogJ1RIUkVFJyxcblx0XHQnNCc6ICdGT1JFJyxcblx0XHQnNSc6ICdGSUZFJyxcblx0XHQnNic6ICdTSVgnLFxuXHRcdCc3JzogJ1NFRkZFTicsXG5cdFx0JzgnOiAnRUlHSFQnLFxuXHRcdCc5JzogJ05JTkVSJ1xuXHR9XG5cdGlmIChwaG9uW2NoXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHBob25bY2hdO1xuXHR9XG5cdHJldHVybiBjaDtcbiAgfVxuXG4gIGdldFBob25ldGljKGM6IHN0cmluZykgOiBzdHJpbmcge1xuICBcdGxldCBzdDogc3RyaW5nW10gPSBbXTtcbiAgXHRsZXQgYml0cyA9IGMuc3BsaXQoJycpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJpdHMubGVuZ3RoOyBpKyspIHtcblx0XHRzdC5wdXNoKHRoaXMuYWxwaGFiZXQoYml0c1tpXSkpO1xuXHR9XG5cdHJldHVybiBzdC5qb2luKCcgJyk7XG4gIH1cblxufVxuIl19