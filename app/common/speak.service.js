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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYWsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwZWFrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsdUVBQTBFO0FBQzFFLHNDQUFtQztBQUduQztJQVVFO1FBUFEsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQUN2QixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSwyQ0FBZSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsV0FBVyxDQUFFO1lBQ1osQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sc0NBQVMsR0FBaEI7UUFDTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDaEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLG9DQUFPLEdBQWQsVUFBZSxDQUFTO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELHNDQUFTLEdBQVQsVUFBVSxFQUFXO1FBQ3BCLElBQUksQ0FBQyxR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LHdDQUFXLEdBQVgsVUFBWSxDQUFTO1FBQ3BCLElBQUksRUFBRSxHQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBbkpVLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFOztPQUNBLGtCQUFrQixDQXFKOUI7SUFBRCx5QkFBQztDQUFBLEFBckpELElBcUpDO0FBckpZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoJztcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbW1vblNwZWFrU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBUVFM6IFROU1RleHRUb1NwZWVjaDtcbiAgcHJpdmF0ZSBsYW5nOiBzdHJpbmcgPSAnZW4tQVUnO1xuICBwcml2YXRlIHJhdGU6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgdm9sdW1lOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIGlzU3BlYWtpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwaHJhc2VDYWNoZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBzcGVlY2hPbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIFx0dGhpcy5UVFMgPSBuZXcgVE5TVGV4dFRvU3BlZWNoKCk7XG5cdHRoaXMudm9sdW1lID0gMjtcblx0dGhpcy5zcGVhaygnVGhyb3R0bGUgc2V0Jyk7XG5cdC8vdGhpcy5zcGVhaygnQ29udGFjdCEnKTtcblx0bGV0IHQgPSB0aGlzO1xuXHRzZXRJbnRlcnZhbCggKCkgPT4ge1xuXHRcdHQudm9sdW1lID0gMTtcblx0XHR0LnNwZWFrTmV4dCgpO1xuXHR9LCA1MDApO1xuICB9XG5cbiAgcHVibGljIHNob3dMYW5ncygpIHtcbiAgICAgICAgbGV0IGwgPSB0aGlzLlRUUy5nZXRBdmFpbGFibGVMYW5ndWFnZXMoKTtcblx0bC50aGVuKChhKSA9PiB7IGNvbnNvbGUubG9nKGEpOyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSYXRlKHI6IG51bWJlcikge1xuICBcdHRoaXMucmF0ZSA9IHI7XG4gIH1cblxuICBzZXRTcGVlY2gob246IGJvb2xlYW4pIHtcbiAgXHR0aGlzLnNwZWVjaE9uID0gb247XG4gIH1cblxuICBwdWJsaWMgc2V0TGFuZyhsYW5nOiBzdHJpbmcpIHtcbiAgXHR0aGlzLmxhbmcgPSBsYW5nO1xuXHRcdC8vbGFuZ3VhZ2U6ICdlbi1HQlInXG5cdFx0Ly9sYW5ndWFnZTogJ2l0YS1JVEEnXG5cdFx0Ly9sYW5ndWFnZTogJ3J1cy1SVVMnXG5cdFx0Ly9sYW5ndWFnZTogJ3Bvci1CUkEnXG5cdFx0Ly9sYW5ndWFnZTogJ2VuLVVTQSdcbiAgfVxuXG4gIHB1YmxpYyBzcGVhayh0ZXh0OiBzdHJpbmcpIHtcbiAgXHRsZXQgcGhyYXNlcyA9IHRleHQuc3BsaXQoLywsKi8pO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBocmFzZXMubGVuZ3RoOyBpKyspIHtcbiAgXHRcdHRoaXMucGhyYXNlQ2FjaGUucHVzaChwaHJhc2VzW2ldKTtcblx0fVxuICB9XG5cbiAgcHVibGljIGZpbmlzaGVkU3BlYWtpbmcoKSB7XG4gIFx0dGhpcy5pc1NwZWFraW5nID0gZmFsc2U7XG4gIH1cblxuXG4gIHByaXZhdGUgc3BlYWtOZXh0KCkge1xuICBcdGlmICh0aGlzLmlzU3BlYWtpbmcpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKHRoaXMucGhyYXNlQ2FjaGUubGVuZ3RoID4gMCkge1xuXHRcdGlmICh0aGlzLnNwZWVjaE9uKSB7XG5cdFx0XHR0aGlzLmlzU3BlYWtpbmcgPSB0cnVlO1xuXHRcdFx0bGV0IHRleHQgPSB0aGlzLnBocmFzZUNhY2hlLnNoaWZ0KCk7XG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9DQVZPSy8sICdDQVYgTyBLJyk7XG5cdFx0XHRsZXQgc2lodCA9IHRoaXM7XG5cdFx0XHRsZXQgc3BrT3B0aW9uczogU3BlYWtPcHRpb25zID0ge1xuXHRcdFx0XHR0ZXh0OiB0ZXh0LFxuXHRcdFx0XHRzcGVha1JhdGU6IHRoaXMucmF0ZSxcblx0XHRcdFx0dm9sdW1lOiB0aGlzLnZvbHVtZSxcblx0XHRcdFx0bGFuZ3VhZ2U6IHRoaXMubGFuZyxcblx0XHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCgpPT57dGhpcy5maW5pc2hlZFNwZWFraW5nKCl9KVxuXHRcdFx0fTtcblx0XHRcdGNvbnNvbGUubG9nKHRleHQpO1xuXHRcdFx0aWYgKHRoaXMuc3BlZWNoT24pIHtcblx0XHRcdFx0dGhpcy5UVFMuc3BlYWsoc3BrT3B0aW9ucykudGhlbihcblx0XHRcdFx0XHRcdCgpID0+IHsgfSxcblx0XHRcdFx0XHQoZXJyKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnZXJyb3Igc3BlYWtpbmcnLCBlcnIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHRleHQgPSB0aGlzLnBocmFzZUNhY2hlLmpvaW4oXCJcXG5cIik7XG5cdFx0XHR0aGlzLnBocmFzZUNhY2hlID0gW107XG5cdFx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdFx0dGl0bGU6IFwiU2lsZW50Li4uXCIsXG5cdFx0XHRcdG1lc3NhZ2U6IHRleHQsXG5cdFx0XHRcdG9rQnV0dG9uVGV4dDogXCJPS1wiXG5cdFx0XHR9O1xuXHRcdFx0YWxlcnQob3B0aW9ucykudGhlbigoKSA9PiB7IH0pO1xuXHRcdH1cblx0fVxuICB9XG5cbiAgYWxwaGFiZXQoY2g6IHN0cmluZykgOiBzdHJpbmcge1xuICBcdGNoID0gY2gudG9Mb3dlckNhc2UoKTtcbiAgXHRsZXQgcGhvbjogYW55ID0ge1xuXHRcdCdhJzogJ0FMUEhBJyxcblx0XHQnYic6ICdCUkFWTycsXG5cdFx0J2MnOiAnQ0hBUkxJRScsXG5cdFx0J2QnOiAnREVMVEEnLFxuXHRcdCdlJzogJ0VDSE8nLFxuXHRcdCdmJzogJ0ZPWFRST1QnLFxuXHRcdCdnJzogJ0dPTEYnLFxuXHRcdCdoJzogJ0hPVEVMJyxcblx0XHQnaSc6ICdJTkRJQScsXG5cdFx0J2onOiAnSlVMSUVUJyxcblx0XHQnayc6ICdLSUxPJyxcblx0XHQnbCc6ICdMSU1BJyxcblx0XHQnbSc6ICdNSUtFJyxcblx0XHQnbic6ICdOT1ZFTUJFUicsXG5cdFx0J28nOiAnT1NDQVInLFxuXHRcdCdwJzogJ1BVUCBQQVInLFxuXHRcdCdxJzogJ1FVRUJFQycsXG5cdFx0J3InOiAnUk9NRU8nLFxuXHRcdCdzJzogJ1NJRVJSQScsXG5cdFx0J3QnOiAnVEFOR08nLFxuXHRcdCd1JzogJ1VOSUZPUk0nLFxuXHRcdCd2JzogJ1ZJQ1RBJyxcblx0XHQndyc6ICdXSElTS0VZJyxcblx0XHQneCc6ICdYIFJBWScsXG5cdFx0J3knOiAnWUFOS0VFJyxcblx0XHQneic6ICdaVUxVJyxcblx0XHQnMCc6ICdaRVJPJyxcblx0XHQnMSc6ICdXVU4nLFxuXHRcdCcyJzogJ1RXTycsXG5cdFx0JzMnOiAnVEhSRUUnLFxuXHRcdCc0JzogJ0ZPUkUnLFxuXHRcdCc1JzogJ0ZJRkUnLFxuXHRcdCc2JzogJ1NJWCcsXG5cdFx0JzcnOiAnU0VGRkVOJyxcblx0XHQnOCc6ICdFSUdIVCcsXG5cdFx0JzknOiAnTklORVInXG5cdH1cblx0aWYgKHBob25bY2hdICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gcGhvbltjaF07XG5cdH1cblx0cmV0dXJuIGNoO1xuICB9XG5cbiAgZ2V0UGhvbmV0aWMoYzogc3RyaW5nKSA6IHN0cmluZyB7XG4gIFx0bGV0IHN0OiBzdHJpbmdbXSA9IFtdO1xuICBcdGxldCBiaXRzID0gYy5zcGxpdCgnJyk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYml0cy5sZW5ndGg7IGkrKykge1xuXHRcdHN0LnB1c2godGhpcy5hbHBoYWJldChiaXRzW2ldKSk7XG5cdH1cblx0cmV0dXJuIHN0LmpvaW4oJyAnKTtcbiAgfVxuXG59XG4iXX0=