"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ng2_fonticon_1 = require("nativescript-ng2-fonticon");
var WeatherService = /** @class */ (function () {
    function WeatherService(fonticon) {
        this.fonticon = fonticon;
        this.wx = {};
        this.qnhNumber = 1013;
        this.createNewWeather();
    }
    WeatherService.prototype.createNewWeather = function () {
        this.generateWx();
        return this.wx;
    };
    WeatherService.prototype.setWx = function (wx) {
        this.wx.wx.push(wx);
    };
    WeatherService.prototype.setVis = function (visMax, visMin, comment) {
        this.wx.vis = {};
        this.wx.vis.max = visMax;
        this.wx.vis.min = visMin;
        this.wx.vis.comment = comment;
    };
    WeatherService.prototype.setWind = function (direction, variation, strength, gustStrength) {
        this.wx.windStrength = strength;
        this.wx.windGustStrength = gustStrength;
        this.wx.windDirection = direction;
        this.wx.windDirectionVariation = variation;
    };
    WeatherService.prototype.setCloud = function (base, tops, coverage) {
        var cloud = {};
        cloud.base = base;
        cloud.tops = tops;
        cloud.coverage = coverage;
        this.wx.cloud.push(cloud);
    };
    WeatherService.prototype.setTemp = function (temp, dewpoint) {
        this.wx.temp = temp;
        this.wx.dewpoint = dewpoint;
    };
    WeatherService.prototype.getGroundCondition = function () {
        return this.wx.groundCondition;
    };
    WeatherService.prototype.setGround = function (cond) {
        this.wx.groundCondition = cond;
    };
    WeatherService.prototype.generateWind = function () {
        var windStrength = Math.floor(Math.random() * 17);
        var windGustStrength = Math.floor(Math.random() * 10);
        var windDirection = Math.floor(Math.random() * 36) * 10;
        var windDirectionVariation = Math.floor(Math.random() * 4) * 10;
        var toDir = windDirection + windDirectionVariation;
        if (toDir === 0) {
            windDirectionVariation += 10;
        }
        if (windDirection === 0) {
            windDirection = 360;
        }
        this.setWind(windDirection, windDirectionVariation, windStrength, windGustStrength);
    };
    WeatherService.prototype.generateTemp = function () {
        var temp = Math.floor(5 + Math.random() * 35);
        var rh = 50 + 50 * Math.random();
        var dewpoint = Math.floor(temp - (100 - rh) / 5);
        this.setTemp(temp, dewpoint);
    };
    WeatherService.prototype.getCurrentTemp = function () {
        var st = this.wx.temp.toString();
        if (this.wx.temp - this.wx.dewpoint < 4) {
            st += ' dp ' + this.wx.dewpoint;
        }
        return st;
    };
    WeatherService.prototype.generateWx = function () {
        this.qnhNumber = Math.floor(1023 - (Math.random() * 20));
        this.wx.qnh = this.toNumbers(this.qnhNumber, 4);
        this.wx.cloud = [];
        this.generateWind();
        this.generateTemp();
        this.setVis(9999, 9999, '');
        this.setGround('');
        this.wx.wx = [];
        var maxOpts = 10;
        var dice = Math.round(Math.random() * maxOpts);
        var subDice = Math.round(Math.random() * maxOpts);
        switch (dice) {
            case 0:
                this.setWx('THUNDERSTORMS IN AREA');
                this.setCloud(2500, 14500, 3);
                this.setTemp(24, 18);
                var dir = Math.round(Math.random() * 36) * 10;
                var v = dir + 40;
                this.setWind(dir, v, 15, 20);
                this.setGround('WATER PATCHES');
                break;
            case 1:
                this.setWx('SHOWERS OF RAIN IN AREA');
                this.setCloud(2000, 4500, 6);
                this.setVis(9999, 4000, 'IN RAIN');
                this.setGround('WET');
                break;
            case 2:
                this.setWx('FOG IN AREA');
                this.setCloud(500, 1200, 7);
                this.setVis(2000, 400, 'IN FOG');
                this.setWind(0, 0, 0, 0);
                this.setTemp(11, 11);
                break;
            case 3:
                this.setWx('FOG');
                this.setVis(500, 500, 'IN FOG');
                this.wx.cloud = [];
                this.setWind(0, 0, 0, 0);
                this.setTemp(10, 10);
                this.setGround('DAMP');
                break;
            case 4:
            case 5:
            case 6:
                this.generateCloud();
                break;
            case 7:
            case 8:
            default:
                this.setWx('CAVOK');
                this.setVis(9999, 9999, '');
                break;
        }
        this.processCloud();
        console.log(this.awis());
    };
    WeatherService.prototype.generateCloud = function () {
        var layers = Math.round(Math.random() * 3);
        var alts = [800, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
        this.wx.cloud = [];
        var coverage = Math.round(Math.random() * 8);
        for (var i = 0; i < layers; i++) {
            var layerI = Math.round(Math.random() * alts.length);
            var base = alts[layerI];
            var extent = Math.round(Math.random() * 3000);
            var tops = base + extent;
            this.setCloud(base, tops, coverage);
            if (++coverage > 8) {
                return;
            }
        }
    };
    WeatherService.prototype.oktasToString = function (o) {
        if (o >= 8) {
            return 'overcast';
        }
        else if (o > 4) {
            return 'broken';
        }
        else if (o > 3) {
            return 'scattered';
        }
        else if (o > 1) {
            return 'few';
        }
        else if (o > 0) {
            return 'isolated';
        }
        return '';
    };
    WeatherService.prototype.visAsText = function () {
        var v = this.wx.vis.max.toString() + ' metres';
        if (this.wx.vis.max === 9999) {
            v = 'greater than 10 kilometres';
        }
        else if (this.wx.vis.max > 5000) {
            v = (this.wx.vis.max / 1000).toString() + ' kilometres';
        }
        if (this.wx.vis.max > this.wx.vis.min) {
            v += ' reducing to ';
            if (this.wx.vis.min === 9999) {
                v += ' greater than 10 kilometres';
            }
            else if (this.wx.vis.min > 5000) {
                v += (this.wx.vis.min / 1000).toString() + ' kilometres';
            }
            else {
                v += this.wx.vis.min.toString() + ' metres';
            }
            v += ' ' + this.wx.vis.comment;
        }
        return v;
    };
    WeatherService.prototype.visAsString = function () {
        var v = this.stNumber(this.wx.vis.max) + ' metres';
        if (this.wx.vis.max === 9999) {
            v = 'greater than ten kilometres';
        }
        else if (this.wx.vis.max > 5000) {
            v = this.stNumber(this.wx.vis.max / 1000) + ' kilometres';
        }
        if (this.wx.vis.max > this.wx.vis.min) {
            v += ' reducing to ';
            if (this.wx.vis.min === 9999) {
                v += ' greater than ten kilometres';
            }
            else if (this.wx.vis.min > 5000) {
                v += this.stNumber(this.wx.vis.min / 1000) + ' kilometres';
            }
            else {
                v += this.stNumber(this.wx.vis.min) + ' metres';
            }
            v += ' ' + this.wx.vis.comment;
        }
        return v;
    };
    WeatherService.prototype.stNumber = function (n) {
        if (n === undefined) {
            return '';
        }
        var digits = n.toString().split('');
        if (n >= 1000) {
            var nst = this.toNumbers(Number(digits[0]), 1) + ' thousand';
            if (digits[1] !== '0') {
                nst += ' ' + this.toNumbers(Number(digits[1]), 1) + ' hundred';
            }
            return nst;
        }
        else if (n >= 100) {
            var nst = this.toNumbers(Number(digits[0]), 1) + ' hundred';
            return nst;
        }
        else {
            var nst = this.toNumbers(n, 1);
        }
    };
    WeatherService.prototype.awis = function () {
        var st = "wind: " + this.windAsString() + "  QNH " + this.wx.qnh + ", Temperature " + this.wx.temp + " dewpoint " + this.wx.dewpoint + ", visibility " + this.visAsString() + " " + this.wx.groundCondition + " cloud " + this.cloudAsString() + " " + this.weatherAsString() + "\n\n";
        return st;
    };
    WeatherService.prototype.processCloud = function () {
        var c = {};
        for (var i = 0; i < this.wx.cloud.length; i++) {
            var cloud = this.wx.cloud[i];
            c[cloud.base] = cloud;
        }
        this.wx.cloud = [];
        var alts = Object.keys(c).sort();
        for (var i = 0; i < alts.length; i++) {
            this.wx.cloud.push(c[alts[i]]);
        }
    };
    WeatherService.prototype.windAsText = function () {
        if (this.wx.windStrength === 0) {
            return 'calm';
        }
        else if (this.wx.windStrength <= 4) {
            return 'variable ' + this.wx.windStrength.toString() + ' knots';
        }
        var st = '';
        var toLead = '';
        var fromLead = '';
        if (this.wx.windDirection < 100) {
            fromLead = '0';
        }
        if (this.wx.windDirectionVariation > 0) {
            var windDirTo = (this.wx.windDirection + this.wx.windDirectionVariation) % 360;
            if (windDirTo < 100) {
                toLead = '0';
            }
            st = 'varying between ' + fromLead + this.wx.windDirection.toString() + ' and ' + toLead + windDirTo;
        }
        else {
            st = fromLead + this.wx.windDirection.toString();
        }
        st += ' degrees, ';
        if (this.wx.windGustStrength > this.wx.windStrength) {
            st += ' minimum ' + this.wx.windStrength.toString() + ' maximum ' + this.wx.windGustStrength.toString() + ' knots';
        }
        else {
            st += ' ' + this.wx.windStrength.toString() + ' knots';
        }
        return st;
    };
    WeatherService.prototype.windAsString = function () {
        if (this.wx.windStrength === 0) {
            return 'calm';
        }
        else if (this.wx.windStrength <= 4) {
            return 'variable ' + this.wx.windStrength.toString() + ' knots';
        }
        var st = '';
        if (this.wx.windDirectionVariation > 0) {
            var windDirTo = (this.wx.windDirection + this.wx.windDirectionVariation) % 360;
            st = 'varying between ' + this.toNumbers(this.wx.windDirection, 3) + ' and ' + this.toNumbers(windDirTo, 3);
        }
        else {
            st = this.toNumbers(this.wx.windDirection, 3);
        }
        st += ' degrees, ';
        if (this.wx.windGustStrength > this.wx.windStrength) {
            st += ' minimum ' + this.toNumbers(this.wx.windStrength, 1) + ' maximum ' + this.toNumbers(this.wx.windGustStrength, 1) + ' knots';
        }
        else {
            st += ' ' + this.toNumbers(this.wx.windStrength, 1) + ' knots';
        }
        return st;
    };
    WeatherService.prototype.visAsShorthand = function () {
        var v = (this.wx.vis.max).toString() + 'm';
        if (this.wx.vis.max === 9999) {
            v = '>10k';
        }
        else if (this.wx.vis.max > 5000) {
            v = (this.wx.vis.max / 1000).toString() + 'k';
        }
        if (this.wx.vis.max > this.wx.vis.min) {
            v += "↓";
            if (this.wx.vis.min === 9999) {
                v += ' >10k';
            }
            else if (this.wx.vis.min > 5000) {
                v += (this.wx.vis.min / 1000).toString() + 'k';
            }
            else {
                v += this.wx.vis.min.toString() + 'm';
            }
            v += ' ' + this.wx.vis.comment.toLowerCase();
        }
        return v;
    };
    WeatherService.prototype.shorthand = function (st) {
        st = st.replace(/thunderstorms/ig, 'ts');
        st = st.replace(/showers/ig, 'shwrs');
        st = st.replace(/ of /ig, ' ');
        st = st.replace(/rain/ig, 'rn');
        st = st.replace(/in area/ig, 'area');
        st = st.replace(/fog/ig, 'fg');
        st = st.replace(/smoke/ig, 'fu');
        st = st.replace(/mist/ig, 'br');
        st = st.replace(/isolated/ig, 'isol');
        st = st.replace(/broken/ig, 'bkn');
        st = st.replace(/scattered/ig, 'sct');
        st = st.replace(/overcast/ig, 'ovc');
        return st;
    };
    WeatherService.prototype.cloudAsShorthand = function () {
        if (this.wx.cloud.length === 0) {
            return '';
        }
        else if (this.isCAVOK()) {
            return '';
        }
        else {
            var st = '';
            for (var i = 0; i < this.wx.cloud.length; i++) {
                var cloud = this.wx.cloud[i];
                st += ' ' + this.oktasToString(cloud.coverage) + ' ' + cloud.base;
            }
            st = this.shorthand(st);
            return st;
        }
    };
    WeatherService.prototype.qnhAsText = function () {
        return this.qnhNumber.toString();
    };
    WeatherService.prototype.qnhAsShorthand = function () {
        return 'Q' + this.qnhNumber.toString();
    };
    WeatherService.prototype.wxAsShorthand = function () {
        var wx = '';
        if (this.wx.wx.length > 0) {
            wx = this.wx.wx.join(', ');
        }
        wx = this.shorthand(wx);
        console.log(wx);
        return wx;
    };
    WeatherService.prototype.windAsShorthand = function () {
        var wind = '';
        if (this.wx.windStrength === 0) {
            return 'clm';
        }
        else if (this.wx.windStrength <= 4) {
            return 'vbl';
        }
        var st = '';
        if (this.wx.windDirectionVariation > 0) {
            var windDirTo = (this.wx.windDirection + this.wx.windDirectionVariation) % 360;
            st = this.wx.windDirection + ' - ' + windDirTo;
        }
        else {
            st = this.wx.windDirection.toString();
        }
        st += '/';
        if (this.wx.windGustStrength > this.wx.windStrength) {
            st += this.wx.windStrength + ' - ' + this.wx.windGustStrength;
        }
        else {
            st += this.wx.windStrength.toString();
        }
        return st;
    };
    WeatherService.prototype.isCAVOK = function () {
        return /CAVOK/.test(this.weatherAsString());
    };
    WeatherService.prototype.isFOG = function () {
        if (/FOG IN AREA/.test(this.weatherAsString())) {
            return false;
        }
        ;
        return /FOG/.test(this.weatherAsString());
    };
    WeatherService.prototype.isRVFR = function () {
        if ((this.wx.vis.min <= 5000) && (this.wx.vis.min >= 1600)) {
            return true;
        }
        return false;
    };
    WeatherService.prototype.isVFR = function () {
        if (this.isRVFR()) {
            return true;
        }
        if (this.wx.vis.min <= 5000) {
            return false;
        }
        var clouds = this.wx.cloud;
        var coverage = 0;
        for (var i = 0; i < clouds.length; i++) {
            var c = clouds[i];
            if (c.base < 1800) {
                coverage += c.coverage;
            }
        }
        if (coverage >= 2) {
            return false;
        }
        return true;
    };
    WeatherService.prototype.isIMC = function () {
        if (this.wx.vis.min <= 5000) {
            return true;
        }
        var clouds = this.wx.cloud;
        var coverage = 0;
        for (var i = 0; i < clouds.length; i++) {
            var c = clouds[i];
            if (c.base < 1800) {
                coverage += c.coverage;
            }
        }
        if (coverage >= 7) {
            return true;
        }
        return false;
    };
    WeatherService.prototype.cloudAsText = function () {
        if (this.wx.cloud.length === 0) {
            return 'nil';
        }
        else {
            var st = '';
            for (var i = 0; i < this.wx.cloud.length; i++) {
                var cloud = this.wx.cloud[i];
                st += ' ' + this.oktasToString(cloud.coverage) + ' ' + cloud.base;
            }
            return st;
        }
    };
    WeatherService.prototype.cloudAsString = function () {
        if (this.wx.cloud.length === 0) {
            return 'nil';
        }
        else {
            var st = '';
            for (var i = 0; i < this.wx.cloud.length; i++) {
                var cloud = this.wx.cloud[i];
                st += ' ' + this.oktasToString(cloud.coverage) + ' ' + this.stNumber(cloud.base);
            }
            return st;
        }
    };
    WeatherService.prototype.weatherAsString = function () {
        if (this.wx.wx.length === 0) {
            return '';
        }
        else {
            return this.wx.wx.join(', ');
        }
    };
    WeatherService.prototype.toNumbers = function (n, digits) {
        var map = {
            '0': 'zero',
            '1': 'wun',
            '2': 'two',
            '3': 'three',
            '4': 'fore',
            '5': 'fife',
            '6': 'six',
            '7': 'seffen',
            '8': 'eight',
            '9': 'niner',
        };
        var nst = n.toString();
        var d = nst.split('');
        var response = [];
        console.log(d, digits);
        if (d.length < digits) {
            response.push('zero');
        }
        for (var i = 0; i < d.length; i++) {
            var dst = d[i];
            var dPhon = map[dst];
            if (dPhon !== undefined) {
                response.push(dPhon);
            }
            else {
                response.push(dst);
            }
        }
        console.log('got', response);
        return response.join(' ');
    };
    WeatherService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [nativescript_ng2_fonticon_1.TNSFontIconService])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VhdGhlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHVFQUErRDtBQUkvRDtJQU1FLHdCQUFvQixRQUE0QjtRQUE1QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUoxQyxPQUFFLEdBQVksRUFBUyxDQUFDO1FBRXZCLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFHaEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLHlDQUFnQixHQUF2QjtRQUNDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCw4QkFBSyxHQUFMLFVBQU0sRUFBVTtRQUNmLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLE1BQWMsRUFBRSxNQUFjLEVBQUUsT0FBZTtRQUNyRCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxTQUFpQixFQUFFLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxZQUFvQjtRQUNuRixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENB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UUFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUMvQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLElBQUksT0FBTyxDQUFDO1lBQ2QsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNoRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDdkMsQ0FBQztZQUNELENBQUMsSUFB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QUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBcGhCUyxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBT21CLDhDQUFrQjtPQU5yQyxjQUFjLENBdWhCMUI7SUFBRCxxQkFBQztDQUFBLEFBdmhCRCxJQXVoQkM7QUF2aEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVE5TRm9udEljb25TZXJ2aWNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nMi1mb250aWNvbic7XG5pbXBvcnQgeyBXZWF0aGVyLCBDbG91ZCB9IGZyb20gJy4vd2VhdGhlci5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2VhdGhlclNlcnZpY2Uge1xuXG5wcml2YXRlIHd4OiBXZWF0aGVyID0ge30gYXMgYW55O1xuXG4gIHB1YmxpYyBxbmhOdW1iZXI6IG51bWJlciA9IDEwMTM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb250aWNvbjogVE5TRm9udEljb25TZXJ2aWNlKSB7XG4gXHR0aGlzLmNyZWF0ZU5ld1dlYXRoZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVOZXdXZWF0aGVyKCk6IFdlYXRoZXIge1xuICBcdHRoaXMuZ2VuZXJhdGVXeCgpO1xuXHRyZXR1cm4gdGhpcy53eDtcbiAgfVxuXG4gIHNldFd4KHd4OiBzdHJpbmcpIHtcbiAgXHR0aGlzLnd4Lnd4LnB1c2god3gpO1xuICB9XG5cbiAgc2V0VmlzKHZpc01heDogbnVtYmVyLCB2aXNNaW46IG51bWJlciwgY29tbWVudDogc3RyaW5nKSB7XG4gIFx0dGhpcy53eC52aXMgPSB7fSBhcyBhbnk7XG4gIFx0dGhpcy53eC52aXMubWF4ID0gdmlzTWF4O1xuICBcdHRoaXMud3gudmlzLm1pbiA9IHZpc01pbjtcbiAgXHR0aGlzLnd4LnZpcy5jb21tZW50ID0gY29tbWVudDtcbiAgfVxuXG4gIHNldFdpbmQoZGlyZWN0aW9uOiBudW1iZXIsIHZhcmlhdGlvbjogbnVtYmVyLCBzdHJlbmd0aDogbnVtYmVyLCBndXN0U3RyZW5ndGg6IG51bWJlcikge1xuXHQgIHRoaXMud3gud2luZFN0cmVuZ3RoID0gc3RyZW5ndGg7XG5cdCAgdGhpcy53eC53aW5kR3VzdFN0cmVuZ3RoID0gZ3VzdFN0cmVuZ3RoO1xuXHQgIHRoaXMud3gud2luZERpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblx0ICB0aGlzLnd4LndpbmREaXJlY3Rpb25WYXJpYXRpb24gPSB2YXJpYXRpb247XG4gIH1cblxuICBzZXRDbG91ZChiYXNlOiBudW1iZXIsIHRvcHM6IG51bWJlciwgY292ZXJhZ2U6IG51bWJlcikge1xuICBcdGxldCBjbG91ZDpDbG91ZCA9IHt9IGFzIGFueTtcblx0Y2xvdWQuYmFzZSA9IGJhc2U7XG5cdGNsb3VkLnRvcHMgPSB0b3BzO1xuXHRjbG91ZC5jb3ZlcmFnZSA9IGNvdmVyYWdlO1xuXHR0aGlzLnd4LmNsb3VkLnB1c2goY2xvdWQpO1xuICB9XG5cbiAgc2V0VGVtcCh0ZW1wOiBudW1iZXIsIGRld3BvaW50OiBudW1iZXIpIHtcbiAgXHR0aGlzLnd4LnRlbXAgPSB0ZW1wO1xuXHR0aGlzLnd4LmRld3BvaW50ID0gZGV3cG9pbnQ7XG4gIH1cblxuICBnZXRHcm91bmRDb25kaXRpb24oKSB7XG4gIFx0cmV0dXJuIHRoaXMud3guZ3JvdW5kQ29uZGl0aW9uO1xuICB9XG5cbiAgc2V0R3JvdW5kKGNvbmQ6IHN0cmluZykge1xuICBcdHRoaXMud3guZ3JvdW5kQ29uZGl0aW9uID0gY29uZDtcbiAgfVxuXG4gIGdlbmVyYXRlV2luZCgpIHtcblx0bGV0IHdpbmRTdHJlbmd0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE3KTtcblx0bGV0IHdpbmRHdXN0U3RyZW5ndGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cdGxldCB3aW5kRGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzYpICogMTA7XG5cdGxldCB3aW5kRGlyZWN0aW9uVmFyaWF0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCkgKiAxMDtcblxuXHRsZXQgdG9EaXIgPSB3aW5kRGlyZWN0aW9uICsgd2luZERpcmVjdGlvblZhcmlhdGlvbjtcblx0aWYgKHRvRGlyID09PSAwKSB7XG5cdFx0d2luZERpcmVjdGlvblZhcmlhdGlvbiArPSAxMDtcblx0fVxuXG5cdGlmICh3aW5kRGlyZWN0aW9uID09PSAwKSB7XG5cdFx0d2luZERpcmVjdGlvbiA9IDM2MDtcblx0fVxuXG5cdHRoaXMuc2V0V2luZCh3aW5kRGlyZWN0aW9uLCB3aW5kRGlyZWN0aW9uVmFyaWF0aW9uLCB3aW5kU3RyZW5ndGgsIHdpbmRHdXN0U3RyZW5ndGgpO1xuICB9XG5cbiAgZ2VuZXJhdGVUZW1wKCkge1xuXHRsZXQgdGVtcCA9IE1hdGguZmxvb3IoNSArIE1hdGgucmFuZG9tKCkgKiAzNSk7XG5cdGxldCByaCA9IDUwICsgNTAgKiBNYXRoLnJhbmRvbSgpO1xuXHRsZXQgZGV3cG9pbnQgPSBNYXRoLmZsb29yKHRlbXAgLSAoMTAwIC0gcmgpLzUpXG5cdHRoaXMuc2V0VGVtcCh0ZW1wLCBkZXdwb2ludCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudFRlbXAoKTogc3RyaW5nIHtcblx0ICBsZXQgc3QgPSB0aGlzLnd4LnRlbXAudG9TdHJpbmcoKTtcblx0ICBpZiAodGhpcy53eC50ZW1wIC0gdGhpcy53eC5kZXdwb2ludCA8IDQpIHtcblx0ICBcdHN0ICs9ICcgZHAgJyArIHRoaXMud3guZGV3cG9pbnQ7XG5cdCAgfVxuICBcdHJldHVybiBzdDtcbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZVd4KCkge1xuICBcdHRoaXMucW5oTnVtYmVyID0gTWF0aC5mbG9vcigxMDIzIC0gKE1hdGgucmFuZG9tKCkgKiAyMCkpO1xuICBcdHRoaXMud3gucW5oID0gdGhpcy50b051bWJlcnModGhpcy5xbmhOdW1iZXIsIDQpO1xuXHR0aGlzLnd4LmNsb3VkID0gW107XG4gIFx0dGhpcy5nZW5lcmF0ZVdpbmQoKTtcbiAgXHR0aGlzLmdlbmVyYXRlVGVtcCgpO1xuICBcdHRoaXMuc2V0VmlzKDk5OTksIDk5OTksICcnKTtcbiAgXHR0aGlzLnNldEdyb3VuZCgnJyk7XG4gIFx0dGhpcy53eC53eCA9IFtdO1xuXG4gIFx0bGV0IG1heE9wdHMgPSAxMDtcblx0bGV0IGRpY2UgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBtYXhPcHRzKTtcblx0bGV0IHN1YkRpY2UgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBtYXhPcHRzKTtcblx0c3dpdGNoIChkaWNlKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0dGhpcy5zZXRXeCgnVEhVTkRFUlNUT1JNUyBJTiBBUkVBJyk7XG5cdFx0XHR0aGlzLnNldENsb3VkKDI1MDAsIDE0NTAwLCAzKTtcblx0XHRcdHRoaXMuc2V0VGVtcCgyNCwgMTgpO1xuXHRcdFx0bGV0IGRpcjogbnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjM2KSAqIDEwO1xuXHRcdFx0bGV0IHY6IG51bWJlciA9IGRpciArIDQwO1xuXHRcdFx0dGhpcy5zZXRXaW5kKGRpciwgdiwgMTUsIDIwKTtcblx0XHRcdHRoaXMuc2V0R3JvdW5kKCdXQVRFUiBQQVRDSEVTJyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDE6XG5cdFx0XHR0aGlzLnNldFd4KCdTSE9XRVJTIE9GIFJBSU4gSU4gQVJFQScpO1xuXHRcdFx0dGhpcy5zZXRDbG91ZCgyMDAwLCA0NTAwLCA2KTtcblx0XHRcdHRoaXMuc2V0VmlzKDk5OTksIDQwMDAsICdJTiBSQUlOJyk7XG5cdFx0XHR0aGlzLnNldEdyb3VuZCgnV0VUJyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHR0aGlzLnNldFd4KCdGT0cgSU4gQVJFQScpO1xuXHRcdFx0dGhpcy5zZXRDbG91ZCg1MDAsIDEyMDAsIDcpO1xuXHRcdFx0dGhpcy5zZXRWaXMoMjAwMCwgNDAwLCAnSU4gRk9HJyk7XG5cdFx0XHR0aGlzLnNldFdpbmQoMCwgMCwgMCwgMCk7XG5cdFx0XHR0aGlzLnNldFRlbXAoMTEsIDExKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdHRoaXMuc2V0V3goJ0ZPRycpO1xuXHRcdFx0dGhpcy5zZXRWaXMoNTAwLCA1MDAsICdJTiBGT0cnKTtcblx0XHRcdHRoaXMud3guY2xvdWQgPSBbXTtcblx0XHRcdHRoaXMuc2V0V2luZCgwLCAwLCAwLCAwKTtcblx0XHRcdHRoaXMuc2V0VGVtcCgxMCwgMTApO1xuXHRcdFx0dGhpcy5zZXRHcm91bmQoJ0RBTVAnKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgNDpcblx0XHRjYXNlIDU6XG5cdFx0Y2FzZSA2OlxuICBcdFx0XHR0aGlzLmdlbmVyYXRlQ2xvdWQoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgNzpcblx0XHRjYXNlIDg6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRoaXMuc2V0V3goJ0NBVk9LJyk7XG5cdFx0XHR0aGlzLnNldFZpcyg5OTk5LCA5OTk5LCAnJyk7XG5cdFx0XHRicmVhaztcblx0fVxuXHR0aGlzLnByb2Nlc3NDbG91ZCgpO1xuXHRjb25zb2xlLmxvZyh0aGlzLmF3aXMoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVDbG91ZCgpIHtcbiAgXHRsZXQgbGF5ZXJzID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XG5cdGxldCBhbHRzID0gWyA4MDAsIDE1MDAsIDIwMDAsIDI1MDAsIDMwMDAsIDM1MDAsIDQwMDAsIDQ1MDAgXTtcblx0dGhpcy53eC5jbG91ZCA9IFtdO1xuXHRsZXQgY292ZXJhZ2UgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA4KTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnM7IGkrKykge1xuXHRcdGxldCBsYXllckkgPSAgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogYWx0cy5sZW5ndGgpO1xuXHRcdGxldCBiYXNlID0gYWx0c1tsYXllckldO1xuXHRcdGxldCBleHRlbnQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzMDAwKTtcblx0XHRsZXQgdG9wcyA9IGJhc2UgKyBleHRlbnQ7XG5cdFx0dGhpcy5zZXRDbG91ZChiYXNlLCB0b3BzLCBjb3ZlcmFnZSk7XG5cdFx0aWYgKCsrY292ZXJhZ2UgPiA4KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG4gIH1cblxuICBva3Rhc1RvU3RyaW5nKG86IG51bWJlcikge1xuICBcdGlmIChvID49IDgpIHtcblx0XHRyZXR1cm4gJ292ZXJjYXN0Jztcblx0fSBlbHNlIGlmIChvID4gNCkge1xuXHRcdHJldHVybiAnYnJva2VuJztcblx0fSBlbHNlIGlmIChvID4gMykge1xuXHRcdHJldHVybiAnc2NhdHRlcmVkJztcblx0fSBlbHNlIGlmIChvID4gMSkge1xuXHRcdHJldHVybiAnZmV3Jztcblx0fSBlbHNlIGlmIChvID4gMCkge1xuXHRcdHJldHVybiAnaXNvbGF0ZWQnO1xuXHR9XG5cdHJldHVybiAnJ1xuICB9XG5cbiAgcHVibGljIHZpc0FzVGV4dCgpOiBzdHJpbmcge1xuICBcdGxldCB2ID0gdGhpcy53eC52aXMubWF4LnRvU3RyaW5nKCkgKyAnIG1ldHJlcyc7XG4gIFx0aWYgKHRoaXMud3gudmlzLm1heCA9PT0gOTk5OSkge1xuXHRcdHYgPSAnZ3JlYXRlciB0aGFuIDEwIGtpbG9tZXRyZXMnO1xuXHR9IGVsc2UgaWYgKHRoaXMud3gudmlzLm1heCA+IDUwMDApIHtcblx0XHR2ID0gKHRoaXMud3gudmlzLm1heCAvIDEwMDApLnRvU3RyaW5nKCkgKyAnIGtpbG9tZXRyZXMnO1xuXHR9XG5cblx0aWYgKHRoaXMud3gudmlzLm1heCA+IHRoaXMud3gudmlzLm1pbikge1xuXHRcdHYgKz0gJyByZWR1Y2luZyB0byAnO1xuICBcdFx0aWYgKHRoaXMud3gudmlzLm1pbiA9PT0gOTk5OSkge1xuXHRcdFx0diArPSAnIGdyZWF0ZXIgdGhhbiAxMCBraWxvbWV0cmVzJztcblx0XHRcdH0gZWxzZSBpZiAodGhpcy53eC52aXMubWluID4gNTAwMCkge1xuXHRcdFx0diArPSAodGhpcy53eC52aXMubWluIC8gMTAwMCkudG9TdHJpbmcoKSArICcga2lsb21ldHJlcyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYgKz0gdGhpcy53eC52aXMubWluLnRvU3RyaW5nKCkgKyAnIG1ldHJlcyc7XG5cdFx0fVxuXHRcdHYgKz0gJyAnICsgdGhpcy53eC52aXMuY29tbWVudDtcblx0fVxuXHRyZXR1cm4gdjtcbiAgIH1cblxuICBwdWJsaWMgdmlzQXNTdHJpbmcoKTogc3RyaW5nIHtcbiAgXHRsZXQgdiA9IHRoaXMuc3ROdW1iZXIodGhpcy53eC52aXMubWF4KSArICcgbWV0cmVzJztcbiAgXHRpZiAodGhpcy53eC52aXMubWF4ID09PSA5OTk5KSB7XG5cdFx0diA9ICdncmVhdGVyIHRoYW4gdGVuIGtpbG9tZXRyZXMnO1xuXHR9IGVsc2UgaWYgKHRoaXMud3gudmlzLm1heCA+IDUwMDApIHtcblx0XHR2ID0gdGhpcy5zdE51bWJlcih0aGlzLnd4LnZpcy5tYXggLyAxMDAwKSArICcga2lsb21ldHJlcyc7XG5cdH1cblxuXHRpZiAodGhpcy53eC52aXMubWF4ID4gdGhpcy53eC52aXMubWluKSB7XG5cdFx0diArPSAnIHJlZHVjaW5nIHRvICc7XG4gIFx0XHRpZiAodGhpcy53eC52aXMubWluID09PSA5OTk5KSB7XG5cdFx0XHR2ICs9ICcgZ3JlYXRlciB0aGFuIHRlbiBraWxvbWV0cmVzJztcblx0XHRcdH0gZWxzZSBpZiAodGhpcy53eC52aXMubWluID4gNTAwMCkge1xuXHRcdFx0diArPSB0aGlzLnN0TnVtYmVyKHRoaXMud3gudmlzLm1pbiAvIDEwMDApICsgJyBraWxvbWV0cmVzJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0diArPSB0aGlzLnN0TnVtYmVyKHRoaXMud3gudmlzLm1pbikgKyAnIG1ldHJlcyc7XG5cdFx0fVxuXHRcdHYgKz0gJyAnICsgdGhpcy53eC52aXMuY29tbWVudDtcblx0fVxuXHRyZXR1cm4gdjtcbiAgIH1cblxuICAgc3ROdW1iZXIobjogbnVtYmVyKSA6IHN0cmluZyB7XG4gICBcdGlmIChuID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cbiAgICAgICAgbGV0IGRpZ2l0czogc3RyaW5nW10gPSBuLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgXHRpZiAobiA+PSAxMDAwKSB7XG5cdFx0bGV0IG5zdCA9IHRoaXMudG9OdW1iZXJzKE51bWJlcihkaWdpdHNbMF0pLCAxKSArICcgdGhvdXNhbmQnO1xuXHRcdGlmIChkaWdpdHNbMV0gIT09ICcwJykge1xuXHRcdFx0bnN0ICs9ICcgJyArIHRoaXMudG9OdW1iZXJzKE51bWJlcihkaWdpdHNbMV0pLCAxKSArICcgaHVuZHJlZCc7XG5cdFx0fVxuXHRcdHJldHVybiBuc3Q7XG5cdFx0XG5cdH0gZWxzZSBpZiAobiA+PSAxMDApIHtcblx0XHRsZXQgbnN0ID0gdGhpcy50b051bWJlcnMoTnVtYmVyKGRpZ2l0c1swXSksIDEpICsgJyBodW5kcmVkJztcblx0XHRyZXR1cm4gbnN0O1xuXHR9IGVsc2Uge1xuXHRcdGxldCBuc3QgPSB0aGlzLnRvTnVtYmVycyhuLCAxKTtcblx0fVxuICB9XG5cbiAgcHVibGljIGF3aXMoKSA6IHN0cmluZyB7XG5cdGxldCBzdCA9IFwid2luZDogXCIgKyB0aGlzLndpbmRBc1N0cmluZygpICsgXCIgIFFOSCBcIiArIHRoaXMud3gucW5oICsgXCIsIFRlbXBlcmF0dXJlIFwiICsgdGhpcy53eC50ZW1wICsgXCIgZGV3cG9pbnQgXCIgKyB0aGlzLnd4LmRld3BvaW50ICsgXCIsIHZpc2liaWxpdHkgXCIgKyB0aGlzLnZpc0FzU3RyaW5nKCkgKyBcIiBcIiArIHRoaXMud3guZ3JvdW5kQ29uZGl0aW9uICsgXCIgY2xvdWQgXCIgKyB0aGlzLmNsb3VkQXNTdHJpbmcoKSArIFwiIFwiICsgdGhpcy53ZWF0aGVyQXNTdHJpbmcoKSArIFwiXFxuXFxuXCI7XG5cdHJldHVybiBzdDtcbiAgfVxuXG4gIHByb2Nlc3NDbG91ZCgpIHtcbiAgXHRsZXQgYzogYW55ID0ge307XG4gIFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnd4LmNsb3VkLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGNsb3VkOiBDbG91ZCA9IHRoaXMud3guY2xvdWRbaV07XG5cdFx0Y1tjbG91ZC5iYXNlXSA9IGNsb3VkO1xuXHR9XG5cdHRoaXMud3guY2xvdWQgPSBbXTtcblx0bGV0IGFsdHMgPSBPYmplY3Qua2V5cyhjKS5zb3J0KCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYWx0cy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMud3guY2xvdWQucHVzaChjW2FsdHNbaV1dKTtcblx0fVxuICB9XG5cbiAgd2luZEFzVGV4dCgpOiBzdHJpbmcge1xuXHQgIGlmICh0aGlzLnd4LndpbmRTdHJlbmd0aCA9PT0gMCkge1xuXHQgIFx0cmV0dXJuICdjYWxtJztcblx0ICB9IGVsc2UgaWYgKHRoaXMud3gud2luZFN0cmVuZ3RoIDw9IDQpIHtcblx0ICBcdHJldHVybiAndmFyaWFibGUgJyArIHRoaXMud3gud2luZFN0cmVuZ3RoLnRvU3RyaW5nKCkgKyAnIGtub3RzJztcblx0ICB9XG5cdCAgbGV0IHN0ID0gJyc7XG5cdCAgbGV0IHRvTGVhZCA9ICcnO1xuXHQgIGxldCBmcm9tTGVhZCA9ICcnO1xuXHQgIGlmICh0aGlzLnd4LndpbmREaXJlY3Rpb24gPCAxMDApIFxuXHQgIHtcblx0XHRmcm9tTGVhZCA9ICcwJztcblx0ICB9XG5cdCAgaWYgKHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbiA+IDApIHtcbiAgICAgICAgXHRsZXQgd2luZERpclRvID0gKHRoaXMud3gud2luZERpcmVjdGlvbiArIHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbikgJSAzNjA7XG5cdFx0aWYgKHdpbmREaXJUbyA8IDEwMCkgXG5cdFx0e1xuXHRcdFx0dG9MZWFkID0gJzAnO1xuXHRcdH1cblx0ICBcdHN0ID0gJ3ZhcnlpbmcgYmV0d2VlbiAnICsgZnJvbUxlYWQgKyB0aGlzLnd4LndpbmREaXJlY3Rpb24udG9TdHJpbmcoKSArICcgYW5kICcgKyB0b0xlYWQgKyB3aW5kRGlyVG87XG5cdCAgfSBlbHNlIHtcblx0ICBcdHN0ID0gZnJvbUxlYWQgKyB0aGlzLnd4LndpbmREaXJlY3Rpb24udG9TdHJpbmcoKTtcblx0ICB9XG5cdCAgc3QgKz0gJyBkZWdyZWVzLCAnO1xuXHQgIGlmICh0aGlzLnd4LndpbmRHdXN0U3RyZW5ndGggPiB0aGlzLnd4LndpbmRTdHJlbmd0aCkge1xuXHQgIFx0c3QgKz0gJyBtaW5pbXVtICcgKyB0aGlzLnd4LndpbmRTdHJlbmd0aC50b1N0cmluZygpICsgJyBtYXhpbXVtICcgKyB0aGlzLnd4LndpbmRHdXN0U3RyZW5ndGgudG9TdHJpbmcoKSAgKyAnIGtub3RzJ1xuXHQgIH0gZWxzZSB7XG5cdCAgXHRzdCArPSAnICcgKyB0aGlzLnd4LndpbmRTdHJlbmd0aC50b1N0cmluZygpICsgJyBrbm90cydcblx0ICB9XG5cdCAgcmV0dXJuIHN0O1xuICB9XG5cbiAgd2luZEFzU3RyaW5nKCk6IHN0cmluZyB7XG5cdCAgaWYgKHRoaXMud3gud2luZFN0cmVuZ3RoID09PSAwKSB7XG5cdCAgXHRyZXR1cm4gJ2NhbG0nO1xuXHQgIH0gZWxzZSBpZiAodGhpcy53eC53aW5kU3RyZW5ndGggPD0gNCkge1xuXHQgIFx0cmV0dXJuICd2YXJpYWJsZSAnICsgdGhpcy53eC53aW5kU3RyZW5ndGgudG9TdHJpbmcoKSArICcga25vdHMnO1xuXHQgIH1cblx0ICBsZXQgc3QgPSAnJztcblx0ICBpZiAodGhpcy53eC53aW5kRGlyZWN0aW9uVmFyaWF0aW9uID4gMCkge1xuICAgICAgICBcdGxldCB3aW5kRGlyVG8gPSAodGhpcy53eC53aW5kRGlyZWN0aW9uICsgdGhpcy53eC53aW5kRGlyZWN0aW9uVmFyaWF0aW9uKSAlIDM2MDtcblx0ICBcdHN0ID0gJ3ZhcnlpbmcgYmV0d2VlbiAnICsgdGhpcy50b051bWJlcnModGhpcy53eC53aW5kRGlyZWN0aW9uLCAzKSArICcgYW5kICcgKyB0aGlzLnRvTnVtYmVycyh3aW5kRGlyVG8sIDMpO1xuXHQgIH0gZWxzZSB7XG5cdCAgXHRzdCA9IHRoaXMudG9OdW1iZXJzKHRoaXMud3gud2luZERpcmVjdGlvbiwgMyk7XG5cdCAgfVxuXHQgIHN0ICs9ICcgZGVncmVlcywgJztcblx0ICBpZiAodGhpcy53eC53aW5kR3VzdFN0cmVuZ3RoID4gdGhpcy53eC53aW5kU3RyZW5ndGgpIHtcblx0ICBcdHN0ICs9ICcgbWluaW11bSAnICsgdGhpcy50b051bWJlcnModGhpcy53eC53aW5kU3RyZW5ndGgsIDEpICsgJyBtYXhpbXVtICcgKyB0aGlzLnRvTnVtYmVycyh0aGlzLnd4LndpbmRHdXN0U3RyZW5ndGgsIDEpICArICcga25vdHMnXG5cdCAgfSBlbHNlIHtcblx0ICBcdHN0ICs9ICcgJyArIHRoaXMudG9OdW1iZXJzKHRoaXMud3gud2luZFN0cmVuZ3RoLCAxKSArICcga25vdHMnXG5cdCAgfVxuXHQgIHJldHVybiBzdDtcbiAgfVxuXG4gIHB1YmxpYyB2aXNBc1Nob3J0aGFuZCgpOiBzdHJpbmcge1xuICBcdGxldCB2ID0gKHRoaXMud3gudmlzLm1heCkudG9TdHJpbmcoKSArICdtJztcbiAgXHRpZiAodGhpcy53eC52aXMubWF4ID09PSA5OTk5KSB7XG5cdHYgPSAnPjEwayc7XG5cdH0gZWxzZSBpZiAodGhpcy53eC52aXMubWF4ID4gNTAwMCkge1xuXHRcdHYgPSAodGhpcy53eC52aXMubWF4IC8gMTAwMCkudG9TdHJpbmcoKSArICdrJztcblx0fVxuXG5cdGlmICh0aGlzLnd4LnZpcy5tYXggPiB0aGlzLnd4LnZpcy5taW4pIHtcblx0XHR2ICs9IFwi4oaTXCI7XG4gIFx0XHRpZiAodGhpcy53eC52aXMubWluID09PSA5OTk5KSB7XG5cdFx0XHR2ICs9ICcgPjEwayc7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnd4LnZpcy5taW4gPiA1MDAwKSB7XG5cdFx0XHR2ICs9ICh0aGlzLnd4LnZpcy5taW4gLyAxMDAwKS50b1N0cmluZygpICsgJ2snO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2ICs9IHRoaXMud3gudmlzLm1pbi50b1N0cmluZygpICsgJ20nO1xuXHRcdH1cblx0XHR2ICs9ICcgJyArIHRoaXMud3gudmlzLmNvbW1lbnQudG9Mb3dlckNhc2UoKTtcblx0fVxuXHRyZXR1cm4gdjtcbiAgIH1cblxuICAgcHVibGljIHNob3J0aGFuZChzdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgIFx0c3QgPSBzdC5yZXBsYWNlKC90aHVuZGVyc3Rvcm1zL2lnLCAndHMnKTtcbiAgIFx0c3QgPSBzdC5yZXBsYWNlKC9zaG93ZXJzL2lnLCAnc2h3cnMnKTtcbiAgIFx0c3QgPSBzdC5yZXBsYWNlKC8gb2YgL2lnLCAnICcpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL3JhaW4vaWcsICdybicpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL2luIGFyZWEvaWcsICdhcmVhJyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvZm9nL2lnLCAnZmcnKTtcbiAgIFx0c3QgPSBzdC5yZXBsYWNlKC9zbW9rZS9pZywgJ2Z1Jyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvbWlzdC9pZywgJ2JyJyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvaXNvbGF0ZWQvaWcsICdpc29sJyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvYnJva2VuL2lnLCAnYmtuJyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvc2NhdHRlcmVkL2lnLCAnc2N0Jyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvb3ZlcmNhc3QvaWcsICdvdmMnKTtcblx0cmV0dXJuIHN0O1xuICAgfVxuXG4gIHB1YmxpYyBjbG91ZEFzU2hvcnRoYW5kKCk6IHN0cmluZyB7XG4gIFx0aWYgKHRoaXMud3guY2xvdWQubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuICcnO1xuXHRcdH1cbiAgXHRlbHNlIGlmICh0aGlzLmlzQ0FWT0soKSkge1xuXHRcdHJldHVybiAnJztcblx0fSBlbHNlIHtcblx0XHRsZXQgc3QgPSAnJztcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud3guY2xvdWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBjbG91ZDogQ2xvdWQgPSB0aGlzLnd4LmNsb3VkW2ldO1xuXHRcdFx0c3QgKz0gJyAnICsgdGhpcy5va3Rhc1RvU3RyaW5nKGNsb3VkLmNvdmVyYWdlKSArICcgJyArIGNsb3VkLmJhc2U7XG5cdFx0fVxuXHRcdHN0ID0gdGhpcy5zaG9ydGhhbmQoc3QpO1xuXHRcdHJldHVybiBzdDtcblx0fVxuICB9XG5cbiAgcHVibGljIHFuaEFzVGV4dCgpOiBzdHJpbmcge1xuICBcdHJldHVybiB0aGlzLnFuaE51bWJlci50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHFuaEFzU2hvcnRoYW5kKCk6IHN0cmluZyB7XG4gIFx0cmV0dXJuICdRJyArIHRoaXMucW5oTnVtYmVyLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgd3hBc1Nob3J0aGFuZCgpOiBzdHJpbmcge1xuICBcdGxldCB3eCA9ICcnO1xuXHRpZiAodGhpcy53eC53eC5sZW5ndGggPiAwKSB7XG5cdFx0d3ggPSB0aGlzLnd4Lnd4LmpvaW4oJywgJyk7XG5cdH1cblx0d3ggPSB0aGlzLnNob3J0aGFuZCh3eCk7XG5cdGNvbnNvbGUubG9nKHd4KTtcblx0cmV0dXJuIHd4O1xuICB9XG5cbiAgd2luZEFzU2hvcnRoYW5kKCk6IHN0cmluZyB7XG4gIFx0bGV0IHdpbmQgPSAnJ1xuXHQgIGlmICh0aGlzLnd4LndpbmRTdHJlbmd0aCA9PT0gMCkge1xuXHQgIFx0cmV0dXJuICdjbG0nO1xuXHQgIH0gZWxzZSBpZiAodGhpcy53eC53aW5kU3RyZW5ndGggPD0gNCkge1xuXHQgIFx0cmV0dXJuICd2YmwnO1xuXHQgIH1cblx0ICBsZXQgc3QgPSAnJztcblx0ICBpZiAodGhpcy53eC53aW5kRGlyZWN0aW9uVmFyaWF0aW9uID4gMCkge1xuICAgICAgICBcdGxldCB3aW5kRGlyVG8gPSAodGhpcy53eC53aW5kRGlyZWN0aW9uICsgdGhpcy53eC53aW5kRGlyZWN0aW9uVmFyaWF0aW9uKSAlIDM2MDtcblx0ICBcdHN0ID0gdGhpcy53eC53aW5kRGlyZWN0aW9uICsgJyAtICcgKyB3aW5kRGlyVG87XG5cdCAgfSBlbHNlIHtcblx0ICBcdHN0ID0gdGhpcy53eC53aW5kRGlyZWN0aW9uLnRvU3RyaW5nKCk7XG5cdCAgfVxuXHQgIHN0ICs9ICcvJztcblx0ICBpZiAodGhpcy53eC53aW5kR3VzdFN0cmVuZ3RoID4gdGhpcy53eC53aW5kU3RyZW5ndGgpIHtcblx0ICBcdHN0ICs9IHRoaXMud3gud2luZFN0cmVuZ3RoICsgJyAtICcgKyB0aGlzLnd4LndpbmRHdXN0U3RyZW5ndGg7XG5cdCAgfSBlbHNlIHtcblx0ICBcdHN0ICs9IHRoaXMud3gud2luZFN0cmVuZ3RoLnRvU3RyaW5nKCk7XG5cdCAgfVxuXHQgIHJldHVybiBzdDtcbiAgfVxuXG4gIGlzQ0FWT0soKSA6IGJvb2xlYW4ge1xuICBcdHJldHVybiAvQ0FWT0svLnRlc3QodGhpcy53ZWF0aGVyQXNTdHJpbmcoKSk7XG4gIH1cblxuICBpc0ZPRygpIDogYm9vbGVhbiB7XG5cdCAgaWYgKC9GT0cgSU4gQVJFQS8udGVzdCh0aGlzLndlYXRoZXJBc1N0cmluZygpKSkge1xuXHQgIFx0cmV0dXJuIGZhbHNlO1xuXHQgIH07XG4gIFx0ICByZXR1cm4gL0ZPRy8udGVzdCh0aGlzLndlYXRoZXJBc1N0cmluZygpKTtcbiAgfVxuXG4gIGlzUlZGUigpIDogYm9vbGVhbiB7XG4gIFx0aWYgKCh0aGlzLnd4LnZpcy5taW4gPD0gNTAwMCkgJiYgKHRoaXMud3gudmlzLm1pbiA+PSAxNjAwKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzVkZSKCkgOiBib29sZWFuIHtcbiAgXHRpZiAodGhpcy5pc1JWRlIoKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG4gIFx0aWYgKHRoaXMud3gudmlzLm1pbiA8PSA1MDAwKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGxldCBjbG91ZHMgPSB0aGlzLnd4LmNsb3VkO1xuXHRsZXQgY292ZXJhZ2UgPSAwO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGNsb3Vkcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBjID0gY2xvdWRzW2ldO1xuXHRcdGlmIChjLmJhc2UgPCAxODAwKSB7XG5cdFx0XHRjb3ZlcmFnZSArPSBjLmNvdmVyYWdlO1xuXHRcdH1cblx0fVxuXHRpZiAoY292ZXJhZ2UgPj0gMikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbiAgfVxuICBcbiAgaXNJTUMoKSA6IGJvb2xlYW4ge1xuICBcdGlmICh0aGlzLnd4LnZpcy5taW4gPD0gNTAwMCkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGxldCBjbG91ZHMgPSB0aGlzLnd4LmNsb3VkO1xuXHRsZXQgY292ZXJhZ2UgPSAwO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGNsb3Vkcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBjID0gY2xvdWRzW2ldO1xuXHRcdGlmIChjLmJhc2UgPCAxODAwKSB7XG5cdFx0XHRjb3ZlcmFnZSArPSBjLmNvdmVyYWdlO1xuXHRcdH1cblx0fVxuXHRpZiAoY292ZXJhZ2UgPj0gNykge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNsb3VkQXNUZXh0KCkgOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLnd4LmNsb3VkLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiAnbmlsJztcblx0fSBlbHNlIHtcblx0XHRsZXQgc3QgPSAnJztcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud3guY2xvdWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBjbG91ZDogQ2xvdWQgPSB0aGlzLnd4LmNsb3VkW2ldO1xuXHRcdFx0c3QgKz0gJyAnICsgdGhpcy5va3Rhc1RvU3RyaW5nKGNsb3VkLmNvdmVyYWdlKSArICcgJyArIGNsb3VkLmJhc2U7XG5cdFx0fVxuXHRcdHJldHVybiBzdDtcblx0fVxuICB9XG4gIGNsb3VkQXNTdHJpbmcoKSA6IHN0cmluZyB7XG4gIFx0aWYgKHRoaXMud3guY2xvdWQubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuICduaWwnO1xuXHR9IGVsc2Uge1xuXHRcdGxldCBzdCA9ICcnO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53eC5jbG91ZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IGNsb3VkOiBDbG91ZCA9IHRoaXMud3guY2xvdWRbaV07XG5cdFx0XHRzdCArPSAnICcgKyB0aGlzLm9rdGFzVG9TdHJpbmcoY2xvdWQuY292ZXJhZ2UpICsgJyAnICsgdGhpcy5zdE51bWJlcihjbG91ZC5iYXNlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHN0O1xuXHR9XG4gIH1cblxuICB3ZWF0aGVyQXNTdHJpbmcoKSA6IHN0cmluZyB7XG4gIFx0aWYgKHRoaXMud3gud3gubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0aGlzLnd4Lnd4LmpvaW4oJywgJyk7XG5cdH1cbiAgfVxuXG4gICBwdWJsaWMgdG9OdW1iZXJzKG46IG51bWJlciwgZGlnaXRzOiBudW1iZXIpIDogc3RyaW5nIHtcbiAgIFx0bGV0IG1hcCA9IHtcblx0XHQnMCc6ICd6ZXJvJyxcblx0XHQnMSc6ICd3dW4nLFxuXHRcdCcyJzogJ3R3bycsXG5cdFx0JzMnOiAndGhyZWUnLFxuXHRcdCc0JzogJ2ZvcmUnLFxuXHRcdCc1JzogJ2ZpZmUnLFxuXHRcdCc2JzogJ3NpeCcsXG5cdFx0JzcnOiAnc2VmZmVuJyxcblx0XHQnOCc6ICdlaWdodCcsXG5cdFx0JzknOiAnbmluZXInLFxuXHRcdH07XG4gICBcdGxldCBuc3QgPSBuLnRvU3RyaW5nKCk7XG5cdGxldCBkID0gbnN0LnNwbGl0KCcnKTtcblx0bGV0IHJlc3BvbnNlOiBzdHJpbmdbXSA9IFtdO1xuXHRjb25zb2xlLmxvZyhkLCBkaWdpdHMpO1xuXHRpZiAoZC5sZW5ndGggPCBkaWdpdHMpIHtcblx0XHRyZXNwb25zZS5wdXNoKCd6ZXJvJyk7XG5cdH1cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGRzdCA9IGRbaV07XG5cdFx0bGV0IGRQaG9uID0gbWFwW2RzdF07XG5cdFx0aWYgKGRQaG9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlc3BvbnNlLnB1c2goZFBob24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXNwb25zZS5wdXNoKGRzdCk7XG5cdFx0fVxuXHR9XG5cdGNvbnNvbGUubG9nKCdnb3QnLCByZXNwb25zZSk7XG5cdHJldHVybiByZXNwb25zZS5qb2luKCcgJyk7XG4gICB9XG5cblxufVxuIl19