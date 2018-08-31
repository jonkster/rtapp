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
        this.wx.qnh = this.toNumbers(this.qnhNumber);
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
        var alts = [800, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 7000];
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
            var nst = this.toNumbers(Number(digits[0])) + ' thousand';
            if (digits[1] !== '0') {
                nst += ' ' + this.toNumbers(Number(digits[1])) + ' hundred';
            }
            return nst;
        }
        else if (n >= 100) {
            var nst = this.toNumbers(Number(digits[0])) + ' hundred';
            return nst;
        }
        else {
            var nst = this.toNumbers(n);
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
            return 'variable';
        }
        var st = '';
        if (this.wx.windDirectionVariation > 0) {
            var windDirTo = (this.wx.windDirection + this.wx.windDirectionVariation) % 360;
            st = 'varying between ' + this.wx.windDirection.toString() + ' and ' + windDirTo.toString();
        }
        else {
            st = this.wx.windDirection.toString();
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
            return 'variable';
        }
        var st = '';
        if (this.wx.windDirectionVariation > 0) {
            var windDirTo = (this.wx.windDirection + this.wx.windDirectionVariation) % 360;
            st = 'varying between ' + this.toNumbers(this.wx.windDirection) + ' and ' + this.toNumbers(windDirTo);
        }
        else {
            st = this.toNumbers(this.wx.windDirection);
        }
        st += ' degrees, ';
        if (this.wx.windGustStrength > this.wx.windStrength) {
            st += ' minimum ' + this.toNumbers(this.wx.windStrength) + ' maximum ' + this.toNumbers(this.wx.windGustStrength) + ' knots';
        }
        else {
            st += ' ' + this.toNumbers(this.wx.windStrength) + ' knots';
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
    WeatherService.prototype.toNumbers = function (n) {
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
        return response.join(' ');
    };
    WeatherService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [nativescript_ng2_fonticon_1.TNSFontIconService])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VhdGhlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHVFQUErRDtBQUkvRDtJQU1FLHdCQUFvQixRQUE0QjtRQUE1QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUoxQyxPQUFFLEdBQVksRUFBUyxDQUFDO1FBRXZCLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFHaEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLHlDQUFnQixHQUF2QjtRQUNDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCw4QkFBSyxHQUFMLFVBQU0sRUFBVTtRQUNmLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLE1BQWMsRUFBRSxNQUFjLEVBQUUsT0FBZTtRQUNyRCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxTQUFpQixFQUFFLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxZQUFvQjtRQUNuRixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENB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QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQTNmUyxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBT21CLDhDQUFrQjtPQU5yQyxjQUFjLENBOGYxQjtJQUFELHFCQUFDO0NBQUEsQUE5ZkQsSUE4ZkM7QUE5Zlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUTlNGb250SWNvblNlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtbmcyLWZvbnRpY29uJztcbmltcG9ydCB7IFdlYXRoZXIsIENsb3VkIH0gZnJvbSAnLi93ZWF0aGVyLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWF0aGVyU2VydmljZSB7XG5cbnByaXZhdGUgd3g6IFdlYXRoZXIgPSB7fSBhcyBhbnk7XG5cbiAgcHVibGljIHFuaE51bWJlcjogbnVtYmVyID0gMTAxMztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvbnRpY29uOiBUTlNGb250SWNvblNlcnZpY2UpIHtcbiBcdHRoaXMuY3JlYXRlTmV3V2VhdGhlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZU5ld1dlYXRoZXIoKTogV2VhdGhlciB7XG4gIFx0dGhpcy5nZW5lcmF0ZVd4KCk7XG5cdHJldHVybiB0aGlzLnd4O1xuICB9XG5cbiAgc2V0V3god3g6IHN0cmluZykge1xuICBcdHRoaXMud3gud3gucHVzaCh3eCk7XG4gIH1cblxuICBzZXRWaXModmlzTWF4OiBudW1iZXIsIHZpc01pbjogbnVtYmVyLCBjb21tZW50OiBzdHJpbmcpIHtcbiAgXHR0aGlzLnd4LnZpcyA9IHt9IGFzIGFueTtcbiAgXHR0aGlzLnd4LnZpcy5tYXggPSB2aXNNYXg7XG4gIFx0dGhpcy53eC52aXMubWluID0gdmlzTWluO1xuICBcdHRoaXMud3gudmlzLmNvbW1lbnQgPSBjb21tZW50O1xuICB9XG5cbiAgc2V0V2luZChkaXJlY3Rpb246IG51bWJlciwgdmFyaWF0aW9uOiBudW1iZXIsIHN0cmVuZ3RoOiBudW1iZXIsIGd1c3RTdHJlbmd0aDogbnVtYmVyKSB7XG5cdCAgdGhpcy53eC53aW5kU3RyZW5ndGggPSBzdHJlbmd0aDtcblx0ICB0aGlzLnd4LndpbmRHdXN0U3RyZW5ndGggPSBndXN0U3RyZW5ndGg7XG5cdCAgdGhpcy53eC53aW5kRGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXHQgIHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbiA9IHZhcmlhdGlvbjtcbiAgfVxuXG4gIHNldENsb3VkKGJhc2U6IG51bWJlciwgdG9wczogbnVtYmVyLCBjb3ZlcmFnZTogbnVtYmVyKSB7XG4gIFx0bGV0IGNsb3VkOkNsb3VkID0ge30gYXMgYW55O1xuXHRjbG91ZC5iYXNlID0gYmFzZTtcblx0Y2xvdWQudG9wcyA9IHRvcHM7XG5cdGNsb3VkLmNvdmVyYWdlID0gY292ZXJhZ2U7XG5cdHRoaXMud3guY2xvdWQucHVzaChjbG91ZCk7XG4gIH1cblxuICBzZXRUZW1wKHRlbXA6IG51bWJlciwgZGV3cG9pbnQ6IG51bWJlcikge1xuICBcdHRoaXMud3gudGVtcCA9IHRlbXA7XG5cdHRoaXMud3guZGV3cG9pbnQgPSBkZXdwb2ludDtcbiAgfVxuXG4gIGdldEdyb3VuZENvbmRpdGlvbigpIHtcbiAgXHRyZXR1cm4gdGhpcy53eC5ncm91bmRDb25kaXRpb247XG4gIH1cblxuICBzZXRHcm91bmQoY29uZDogc3RyaW5nKSB7XG4gIFx0dGhpcy53eC5ncm91bmRDb25kaXRpb24gPSBjb25kO1xuICB9XG5cbiAgZ2VuZXJhdGVXaW5kKCkge1xuXHRsZXQgd2luZFN0cmVuZ3RoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTcpO1xuXHRsZXQgd2luZEd1c3RTdHJlbmd0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblx0bGV0IHdpbmREaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNikgKiAxMDtcblx0bGV0IHdpbmREaXJlY3Rpb25WYXJpYXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KSAqIDEwO1xuXHR0aGlzLnNldFdpbmQod2luZERpcmVjdGlvbiwgd2luZERpcmVjdGlvblZhcmlhdGlvbiwgd2luZFN0cmVuZ3RoLCB3aW5kR3VzdFN0cmVuZ3RoKTtcbiAgfVxuXG4gIGdlbmVyYXRlVGVtcCgpIHtcblx0bGV0IHRlbXAgPSBNYXRoLmZsb29yKDUgKyBNYXRoLnJhbmRvbSgpICogMzUpO1xuXHRsZXQgcmggPSA1MCArIDUwICogTWF0aC5yYW5kb20oKTtcblx0bGV0IGRld3BvaW50ID0gTWF0aC5mbG9vcih0ZW1wIC0gKDEwMCAtIHJoKS81KVxuXHR0aGlzLnNldFRlbXAodGVtcCwgZGV3cG9pbnQpO1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRUZW1wKCk6IHN0cmluZyB7XG5cdCAgbGV0IHN0ID0gdGhpcy53eC50ZW1wLnRvU3RyaW5nKCk7XG5cdCAgaWYgKHRoaXMud3gudGVtcCAtIHRoaXMud3guZGV3cG9pbnQgPCA0KSB7XG5cdCAgXHRzdCArPSAnIGRwICcgKyB0aGlzLnd4LmRld3BvaW50O1xuXHQgIH1cbiAgXHRyZXR1cm4gc3Q7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVXeCgpIHtcbiAgXHR0aGlzLnFuaE51bWJlciA9IE1hdGguZmxvb3IoMTAyMyAtIChNYXRoLnJhbmRvbSgpICogMjApKTtcbiAgXHR0aGlzLnd4LnFuaCA9IHRoaXMudG9OdW1iZXJzKHRoaXMucW5oTnVtYmVyKTtcblx0dGhpcy53eC5jbG91ZCA9IFtdO1xuICBcdHRoaXMuZ2VuZXJhdGVXaW5kKCk7XG4gIFx0dGhpcy5nZW5lcmF0ZVRlbXAoKTtcbiAgXHR0aGlzLnNldFZpcyg5OTk5LCA5OTk5LCAnJyk7XG4gIFx0dGhpcy5zZXRHcm91bmQoJycpO1xuICBcdHRoaXMud3gud3ggPSBbXTtcblxuICBcdGxldCBtYXhPcHRzID0gMTA7XG5cdGxldCBkaWNlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogbWF4T3B0cyk7XG5cdGxldCBzdWJEaWNlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogbWF4T3B0cyk7XG5cdHN3aXRjaCAoZGljZSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHRoaXMuc2V0V3goJ1RIVU5ERVJTVE9STVMgSU4gQVJFQScpO1xuXHRcdFx0dGhpcy5zZXRDbG91ZCgyNTAwLCAxNDUwMCwgMyk7XG5cdFx0XHR0aGlzLnNldFRlbXAoMjQsIDE4KTtcblx0XHRcdGxldCBkaXI6IG51bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSozNikgKiAxMDtcblx0XHRcdGxldCB2OiBudW1iZXIgPSBkaXIgKyA0MDtcblx0XHRcdHRoaXMuc2V0V2luZChkaXIsIHYsIDE1LCAyMCk7XG5cdFx0XHR0aGlzLnNldEdyb3VuZCgnV0FURVIgUEFUQ0hFUycpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0dGhpcy5zZXRXeCgnU0hPV0VSUyBPRiBSQUlOIElOIEFSRUEnKTtcblx0XHRcdHRoaXMuc2V0Q2xvdWQoMjAwMCwgNDUwMCwgNik7XG5cdFx0XHR0aGlzLnNldFZpcyg5OTk5LCA0MDAwLCAnSU4gUkFJTicpO1xuXHRcdFx0dGhpcy5zZXRHcm91bmQoJ1dFVCcpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0dGhpcy5zZXRXeCgnRk9HIElOIEFSRUEnKTtcblx0XHRcdHRoaXMuc2V0Q2xvdWQoNTAwLCAxMjAwLCA3KTtcblx0XHRcdHRoaXMuc2V0VmlzKDIwMDAsIDQwMCwgJ0lOIEZPRycpO1xuXHRcdFx0dGhpcy5zZXRXaW5kKDAsIDAsIDAsIDApO1xuXHRcdFx0dGhpcy5zZXRUZW1wKDExLCAxMSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHR0aGlzLnNldFd4KCdGT0cnKTtcblx0XHRcdHRoaXMuc2V0VmlzKDUwMCwgNTAwLCAnSU4gRk9HJyk7XG5cdFx0XHR0aGlzLnd4LmNsb3VkID0gW107XG5cdFx0XHR0aGlzLnNldFdpbmQoMCwgMCwgMCwgMCk7XG5cdFx0XHR0aGlzLnNldFRlbXAoMTAsIDEwKTtcblx0XHRcdHRoaXMuc2V0R3JvdW5kKCdEQU1QJyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDQ6XG5cdFx0Y2FzZSA1OlxuXHRcdGNhc2UgNjpcbiAgXHRcdFx0dGhpcy5nZW5lcmF0ZUNsb3VkKCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDc6XG5cdFx0Y2FzZSA4OlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aGlzLnNldFd4KCdDQVZPSycpO1xuXHRcdFx0dGhpcy5zZXRWaXMoOTk5OSwgOTk5OSwgJycpO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0dGhpcy5wcm9jZXNzQ2xvdWQoKTtcblx0Y29uc29sZS5sb2codGhpcy5hd2lzKCkpO1xuICB9XG5cbiAgcHVibGljIGdlbmVyYXRlQ2xvdWQoKSB7XG4gIFx0bGV0IGxheWVycyA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMpO1xuXHRsZXQgYWx0cyA9IFsgODAwLCAxNTAwLCAyMDAwLCAyNTAwLCAzMDAwLCAzNTAwLCA0MDAwLCA1MDAwLCA3MDAwIF07XG5cdHRoaXMud3guY2xvdWQgPSBbXTtcblx0bGV0IGNvdmVyYWdlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzOyBpKyspIHtcblx0XHRsZXQgbGF5ZXJJID0gIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIGFsdHMubGVuZ3RoKTtcblx0XHRsZXQgYmFzZSA9IGFsdHNbbGF5ZXJJXTtcblx0XHRsZXQgZXh0ZW50ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMzAwMCk7XG5cdFx0bGV0IHRvcHMgPSBiYXNlICsgZXh0ZW50O1xuXHRcdHRoaXMuc2V0Q2xvdWQoYmFzZSwgdG9wcywgY292ZXJhZ2UpO1xuXHRcdGlmICgrK2NvdmVyYWdlID4gOCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuICB9XG5cbiAgb2t0YXNUb1N0cmluZyhvOiBudW1iZXIpIHtcbiAgXHRpZiAobyA+PSA4KSB7XG5cdFx0cmV0dXJuICdvdmVyY2FzdCc7XG5cdH0gZWxzZSBpZiAobyA+IDQpIHtcblx0XHRyZXR1cm4gJ2Jyb2tlbic7XG5cdH0gZWxzZSBpZiAobyA+IDMpIHtcblx0XHRyZXR1cm4gJ3NjYXR0ZXJlZCc7XG5cdH0gZWxzZSBpZiAobyA+IDEpIHtcblx0XHRyZXR1cm4gJ2Zldyc7XG5cdH0gZWxzZSBpZiAobyA+IDApIHtcblx0XHRyZXR1cm4gJ2lzb2xhdGVkJztcblx0fVxuXHRyZXR1cm4gJydcbiAgfVxuXG4gIHB1YmxpYyB2aXNBc1RleHQoKTogc3RyaW5nIHtcbiAgXHRsZXQgdiA9IHRoaXMud3gudmlzLm1heC50b1N0cmluZygpICsgJyBtZXRyZXMnO1xuICBcdGlmICh0aGlzLnd4LnZpcy5tYXggPT09IDk5OTkpIHtcblx0XHR2ID0gJ2dyZWF0ZXIgdGhhbiAxMCBraWxvbWV0cmVzJztcblx0fSBlbHNlIGlmICh0aGlzLnd4LnZpcy5tYXggPiA1MDAwKSB7XG5cdFx0diA9ICh0aGlzLnd4LnZpcy5tYXggLyAxMDAwKS50b1N0cmluZygpICsgJyBraWxvbWV0cmVzJztcblx0fVxuXG5cdGlmICh0aGlzLnd4LnZpcy5tYXggPiB0aGlzLnd4LnZpcy5taW4pIHtcblx0XHR2ICs9ICcgcmVkdWNpbmcgdG8gJztcbiAgXHRcdGlmICh0aGlzLnd4LnZpcy5taW4gPT09IDk5OTkpIHtcblx0XHRcdHYgKz0gJyBncmVhdGVyIHRoYW4gMTAga2lsb21ldHJlcyc7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMud3gudmlzLm1pbiA+IDUwMDApIHtcblx0XHRcdHYgKz0gKHRoaXMud3gudmlzLm1pbiAvIDEwMDApLnRvU3RyaW5nKCkgKyAnIGtpbG9tZXRyZXMnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2ICs9IHRoaXMud3gudmlzLm1pbi50b1N0cmluZygpICsgJyBtZXRyZXMnO1xuXHRcdH1cblx0XHR2ICs9ICcgJyArIHRoaXMud3gudmlzLmNvbW1lbnQ7XG5cdH1cblx0cmV0dXJuIHY7XG4gICB9XG5cbiAgcHVibGljIHZpc0FzU3RyaW5nKCk6IHN0cmluZyB7XG4gIFx0bGV0IHYgPSB0aGlzLnN0TnVtYmVyKHRoaXMud3gudmlzLm1heCkgKyAnIG1ldHJlcyc7XG4gIFx0aWYgKHRoaXMud3gudmlzLm1heCA9PT0gOTk5OSkge1xuXHRcdHYgPSAnZ3JlYXRlciB0aGFuIHRlbiBraWxvbWV0cmVzJztcblx0fSBlbHNlIGlmICh0aGlzLnd4LnZpcy5tYXggPiA1MDAwKSB7XG5cdFx0diA9IHRoaXMuc3ROdW1iZXIodGhpcy53eC52aXMubWF4IC8gMTAwMCkgKyAnIGtpbG9tZXRyZXMnO1xuXHR9XG5cblx0aWYgKHRoaXMud3gudmlzLm1heCA+IHRoaXMud3gudmlzLm1pbikge1xuXHRcdHYgKz0gJyByZWR1Y2luZyB0byAnO1xuICBcdFx0aWYgKHRoaXMud3gudmlzLm1pbiA9PT0gOTk5OSkge1xuXHRcdFx0diArPSAnIGdyZWF0ZXIgdGhhbiB0ZW4ga2lsb21ldHJlcyc7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMud3gudmlzLm1pbiA+IDUwMDApIHtcblx0XHRcdHYgKz0gdGhpcy5zdE51bWJlcih0aGlzLnd4LnZpcy5taW4gLyAxMDAwKSArICcga2lsb21ldHJlcyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYgKz0gdGhpcy5zdE51bWJlcih0aGlzLnd4LnZpcy5taW4pICsgJyBtZXRyZXMnO1xuXHRcdH1cblx0XHR2ICs9ICcgJyArIHRoaXMud3gudmlzLmNvbW1lbnQ7XG5cdH1cblx0cmV0dXJuIHY7XG4gICB9XG5cbiAgIHN0TnVtYmVyKG46IG51bWJlcikgOiBzdHJpbmcge1xuICAgXHRpZiAobiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG4gICAgICAgIGxldCBkaWdpdHM6IHN0cmluZ1tdID0gbi50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgIFx0aWYgKG4gPj0gMTAwMCkge1xuXHRcdGxldCBuc3QgPSB0aGlzLnRvTnVtYmVycyhOdW1iZXIoZGlnaXRzWzBdKSkgKyAnIHRob3VzYW5kJztcblx0XHRpZiAoZGlnaXRzWzFdICE9PSAnMCcpIHtcblx0XHRcdG5zdCArPSAnICcgKyB0aGlzLnRvTnVtYmVycyhOdW1iZXIoZGlnaXRzWzFdKSkgKyAnIGh1bmRyZWQnO1xuXHRcdH1cblx0XHRyZXR1cm4gbnN0O1xuXHRcdFxuXHR9IGVsc2UgaWYgKG4gPj0gMTAwKSB7XG5cdFx0bGV0IG5zdCA9IHRoaXMudG9OdW1iZXJzKE51bWJlcihkaWdpdHNbMF0pKSArICcgaHVuZHJlZCc7XG5cdFx0cmV0dXJuIG5zdDtcblx0fSBlbHNlIHtcblx0XHRsZXQgbnN0ID0gdGhpcy50b051bWJlcnMobik7XG5cdH1cbiAgfVxuXG4gIHB1YmxpYyBhd2lzKCkgOiBzdHJpbmcge1xuXHRsZXQgc3QgPSBcIndpbmQ6IFwiICsgdGhpcy53aW5kQXNTdHJpbmcoKSArIFwiICBRTkggXCIgKyB0aGlzLnd4LnFuaCArIFwiLCBUZW1wZXJhdHVyZSBcIiArIHRoaXMud3gudGVtcCArIFwiIGRld3BvaW50IFwiICsgdGhpcy53eC5kZXdwb2ludCArIFwiLCB2aXNpYmlsaXR5IFwiICsgdGhpcy52aXNBc1N0cmluZygpICsgXCIgXCIgKyB0aGlzLnd4Lmdyb3VuZENvbmRpdGlvbiArIFwiIGNsb3VkIFwiICsgdGhpcy5jbG91ZEFzU3RyaW5nKCkgKyBcIiBcIiArIHRoaXMud2VhdGhlckFzU3RyaW5nKCkgKyBcIlxcblxcblwiO1xuXHRyZXR1cm4gc3Q7XG4gIH1cblxuICBwcm9jZXNzQ2xvdWQoKSB7XG4gIFx0bGV0IGM6IGFueSA9IHt9O1xuICBcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53eC5jbG91ZC5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBjbG91ZDogQ2xvdWQgPSB0aGlzLnd4LmNsb3VkW2ldO1xuXHRcdGNbY2xvdWQuYmFzZV0gPSBjbG91ZDtcblx0fVxuXHR0aGlzLnd4LmNsb3VkID0gW107XG5cdGxldCBhbHRzID0gT2JqZWN0LmtleXMoYykuc29ydCgpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFsdHMubGVuZ3RoOyBpKyspIHtcblx0XHR0aGlzLnd4LmNsb3VkLnB1c2goY1thbHRzW2ldXSk7XG5cdH1cbiAgfVxuXG4gIHdpbmRBc1RleHQoKTogc3RyaW5nIHtcblx0ICBpZiAodGhpcy53eC53aW5kU3RyZW5ndGggPT09IDApIHtcblx0ICBcdHJldHVybiAnY2FsbSc7XG5cdCAgfSBlbHNlIGlmICh0aGlzLnd4LndpbmRTdHJlbmd0aCA8PSA0KSB7XG5cdCAgXHRyZXR1cm4gJ3ZhcmlhYmxlJztcblx0ICB9XG5cdCAgbGV0IHN0ID0gJyc7XG5cdCAgaWYgKHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbiA+IDApIHtcbiAgICAgICAgXHRsZXQgd2luZERpclRvID0gKHRoaXMud3gud2luZERpcmVjdGlvbiArIHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbikgJSAzNjA7XG5cdCAgXHRzdCA9ICd2YXJ5aW5nIGJldHdlZW4gJyArIHRoaXMud3gud2luZERpcmVjdGlvbi50b1N0cmluZygpICsgJyBhbmQgJyArIHdpbmREaXJUby50b1N0cmluZygpO1xuXHQgIH0gZWxzZSB7XG5cdCAgXHRzdCA9IHRoaXMud3gud2luZERpcmVjdGlvbi50b1N0cmluZygpO1xuXHQgIH1cblx0ICBzdCArPSAnIGRlZ3JlZXMsICc7XG5cdCAgaWYgKHRoaXMud3gud2luZEd1c3RTdHJlbmd0aCA+IHRoaXMud3gud2luZFN0cmVuZ3RoKSB7XG5cdCAgXHRzdCArPSAnIG1pbmltdW0gJyArIHRoaXMud3gud2luZFN0cmVuZ3RoLnRvU3RyaW5nKCkgKyAnIG1heGltdW0gJyArIHRoaXMud3gud2luZEd1c3RTdHJlbmd0aC50b1N0cmluZygpICArICcga25vdHMnXG5cdCAgfSBlbHNlIHtcblx0ICBcdHN0ICs9ICcgJyArIHRoaXMud3gud2luZFN0cmVuZ3RoLnRvU3RyaW5nKCkgKyAnIGtub3RzJ1xuXHQgIH1cblx0ICByZXR1cm4gc3Q7XG4gIH1cblxuICB3aW5kQXNTdHJpbmcoKTogc3RyaW5nIHtcblx0ICBpZiAodGhpcy53eC53aW5kU3RyZW5ndGggPT09IDApIHtcblx0ICBcdHJldHVybiAnY2FsbSc7XG5cdCAgfSBlbHNlIGlmICh0aGlzLnd4LndpbmRTdHJlbmd0aCA8PSA0KSB7XG5cdCAgXHRyZXR1cm4gJ3ZhcmlhYmxlJztcblx0ICB9XG5cdCAgbGV0IHN0ID0gJyc7XG5cdCAgaWYgKHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbiA+IDApIHtcbiAgICAgICAgXHRsZXQgd2luZERpclRvID0gKHRoaXMud3gud2luZERpcmVjdGlvbiArIHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbikgJSAzNjA7XG5cdCAgXHRzdCA9ICd2YXJ5aW5nIGJldHdlZW4gJyArIHRoaXMudG9OdW1iZXJzKHRoaXMud3gud2luZERpcmVjdGlvbikgKyAnIGFuZCAnICsgdGhpcy50b051bWJlcnMod2luZERpclRvKTtcblx0ICB9IGVsc2Uge1xuXHQgIFx0c3QgPSB0aGlzLnRvTnVtYmVycyh0aGlzLnd4LndpbmREaXJlY3Rpb24pO1xuXHQgIH1cblx0ICBzdCArPSAnIGRlZ3JlZXMsICc7XG5cdCAgaWYgKHRoaXMud3gud2luZEd1c3RTdHJlbmd0aCA+IHRoaXMud3gud2luZFN0cmVuZ3RoKSB7XG5cdCAgXHRzdCArPSAnIG1pbmltdW0gJyArIHRoaXMudG9OdW1iZXJzKHRoaXMud3gud2luZFN0cmVuZ3RoKSArICcgbWF4aW11bSAnICsgdGhpcy50b051bWJlcnModGhpcy53eC53aW5kR3VzdFN0cmVuZ3RoKSAgKyAnIGtub3RzJ1xuXHQgIH0gZWxzZSB7XG5cdCAgXHRzdCArPSAnICcgKyB0aGlzLnRvTnVtYmVycyh0aGlzLnd4LndpbmRTdHJlbmd0aCkgKyAnIGtub3RzJ1xuXHQgIH1cblx0ICByZXR1cm4gc3Q7XG4gIH1cblxuICBwdWJsaWMgdmlzQXNTaG9ydGhhbmQoKTogc3RyaW5nIHtcbiAgXHRsZXQgdiA9ICh0aGlzLnd4LnZpcy5tYXgpLnRvU3RyaW5nKCkgKyAnbSc7XG4gIFx0aWYgKHRoaXMud3gudmlzLm1heCA9PT0gOTk5OSkge1xuXHR2ID0gJz4xMGsnO1xuXHR9IGVsc2UgaWYgKHRoaXMud3gudmlzLm1heCA+IDUwMDApIHtcblx0XHR2ID0gKHRoaXMud3gudmlzLm1heCAvIDEwMDApLnRvU3RyaW5nKCkgKyAnayc7XG5cdH1cblxuXHRpZiAodGhpcy53eC52aXMubWF4ID4gdGhpcy53eC52aXMubWluKSB7XG5cdFx0diArPSBcIuKGk1wiO1xuICBcdFx0aWYgKHRoaXMud3gudmlzLm1pbiA9PT0gOTk5OSkge1xuXHRcdFx0diArPSAnID4xMGsnO1xuXHRcdH0gZWxzZSBpZiAodGhpcy53eC52aXMubWluID4gNTAwMCkge1xuXHRcdFx0diArPSAodGhpcy53eC52aXMubWluIC8gMTAwMCkudG9TdHJpbmcoKSArICdrJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0diArPSB0aGlzLnd4LnZpcy5taW4udG9TdHJpbmcoKSArICdtJztcblx0XHR9XG5cdFx0diArPSAnICcgKyB0aGlzLnd4LnZpcy5jb21tZW50LnRvTG93ZXJDYXNlKCk7XG5cdH1cblx0cmV0dXJuIHY7XG4gICB9XG5cbiAgIHB1YmxpYyBzaG9ydGhhbmQoc3Q6IHN0cmluZyk6IHN0cmluZyB7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvdGh1bmRlcnN0b3Jtcy9pZywgJ3RzJyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvc2hvd2Vycy9pZywgJ3Nod3JzJyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvIG9mIC9pZywgJyAnKTtcbiAgIFx0c3QgPSBzdC5yZXBsYWNlKC9yYWluL2lnLCAncm4nKTtcbiAgIFx0c3QgPSBzdC5yZXBsYWNlKC9pbiBhcmVhL2lnLCAnYXJlYScpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL2ZvZy9pZywgJ2ZnJyk7XG4gICBcdHN0ID0gc3QucmVwbGFjZSgvc21va2UvaWcsICdmdScpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL21pc3QvaWcsICdicicpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL2lzb2xhdGVkL2lnLCAnaXNvbCcpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL2Jyb2tlbi9pZywgJ2JrbicpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL3NjYXR0ZXJlZC9pZywgJ3NjdCcpO1xuICAgXHRzdCA9IHN0LnJlcGxhY2UoL292ZXJjYXN0L2lnLCAnb3ZjJyk7XG5cdHJldHVybiBzdDtcbiAgIH1cblxuICBwdWJsaWMgY2xvdWRBc1Nob3J0aGFuZCgpOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLnd4LmNsb3VkLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiAnJztcblx0XHR9XG4gIFx0ZWxzZSBpZiAodGhpcy5pc0NBVk9LKCkpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH0gZWxzZSB7XG5cdFx0bGV0IHN0ID0gJyc7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnd4LmNsb3VkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgY2xvdWQ6IENsb3VkID0gdGhpcy53eC5jbG91ZFtpXTtcblx0XHRcdHN0ICs9ICcgJyArIHRoaXMub2t0YXNUb1N0cmluZyhjbG91ZC5jb3ZlcmFnZSkgKyAnICcgKyBjbG91ZC5iYXNlO1xuXHRcdH1cblx0XHRzdCA9IHRoaXMuc2hvcnRoYW5kKHN0KTtcblx0XHRyZXR1cm4gc3Q7XG5cdH1cbiAgfVxuXG4gIHB1YmxpYyBxbmhBc1RleHQoKTogc3RyaW5nIHtcbiAgXHRyZXR1cm4gdGhpcy5xbmhOdW1iZXIudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBxbmhBc1Nob3J0aGFuZCgpOiBzdHJpbmcge1xuICBcdHJldHVybiAnUScgKyB0aGlzLnFuaE51bWJlci50b1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHd4QXNTaG9ydGhhbmQoKTogc3RyaW5nIHtcbiAgXHRsZXQgd3ggPSAnJztcblx0aWYgKHRoaXMud3gud3gubGVuZ3RoID4gMCkge1xuXHRcdHd4ID0gdGhpcy53eC53eC5qb2luKCcsICcpO1xuXHR9XG5cdHd4ID0gdGhpcy5zaG9ydGhhbmQod3gpO1xuXHRjb25zb2xlLmxvZyh3eCk7XG5cdHJldHVybiB3eDtcbiAgfVxuXG4gIHdpbmRBc1Nob3J0aGFuZCgpOiBzdHJpbmcge1xuICBcdGxldCB3aW5kID0gJydcblx0ICBpZiAodGhpcy53eC53aW5kU3RyZW5ndGggPT09IDApIHtcblx0ICBcdHJldHVybiAnY2xtJztcblx0ICB9IGVsc2UgaWYgKHRoaXMud3gud2luZFN0cmVuZ3RoIDw9IDQpIHtcblx0ICBcdHJldHVybiAndmJsJztcblx0ICB9XG5cdCAgbGV0IHN0ID0gJyc7XG5cdCAgaWYgKHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbiA+IDApIHtcbiAgICAgICAgXHRsZXQgd2luZERpclRvID0gKHRoaXMud3gud2luZERpcmVjdGlvbiArIHRoaXMud3gud2luZERpcmVjdGlvblZhcmlhdGlvbikgJSAzNjA7XG5cdCAgXHRzdCA9IHRoaXMud3gud2luZERpcmVjdGlvbiArICcgLSAnICsgd2luZERpclRvO1xuXHQgIH0gZWxzZSB7XG5cdCAgXHRzdCA9IHRoaXMud3gud2luZERpcmVjdGlvbi50b1N0cmluZygpO1xuXHQgIH1cblx0ICBzdCArPSAnLyc7XG5cdCAgaWYgKHRoaXMud3gud2luZEd1c3RTdHJlbmd0aCA+IHRoaXMud3gud2luZFN0cmVuZ3RoKSB7XG5cdCAgXHRzdCArPSB0aGlzLnd4LndpbmRTdHJlbmd0aCArICcgLSAnICsgdGhpcy53eC53aW5kR3VzdFN0cmVuZ3RoO1xuXHQgIH0gZWxzZSB7XG5cdCAgXHRzdCArPSB0aGlzLnd4LndpbmRTdHJlbmd0aC50b1N0cmluZygpO1xuXHQgIH1cblx0ICByZXR1cm4gc3Q7XG4gIH1cblxuICBpc0NBVk9LKCkgOiBib29sZWFuIHtcbiAgXHRyZXR1cm4gL0NBVk9LLy50ZXN0KHRoaXMud2VhdGhlckFzU3RyaW5nKCkpO1xuICB9XG5cbiAgaXNGT0coKSA6IGJvb2xlYW4ge1xuXHQgIGlmICgvRk9HIElOIEFSRUEvLnRlc3QodGhpcy53ZWF0aGVyQXNTdHJpbmcoKSkpIHtcblx0ICBcdHJldHVybiBmYWxzZTtcblx0ICB9O1xuICBcdCAgcmV0dXJuIC9GT0cvLnRlc3QodGhpcy53ZWF0aGVyQXNTdHJpbmcoKSk7XG4gIH1cblxuICBpc1JWRlIoKSA6IGJvb2xlYW4ge1xuICBcdGlmICgodGhpcy53eC52aXMubWluIDw9IDUwMDApICYmICh0aGlzLnd4LnZpcy5taW4gPj0gMTYwMCkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1ZGUigpIDogYm9vbGVhbiB7XG4gIFx0aWYgKHRoaXMuaXNSVkZSKCkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuICBcdGlmICh0aGlzLnd4LnZpcy5taW4gPD0gNTAwMCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsZXQgY2xvdWRzID0gdGhpcy53eC5jbG91ZDtcblx0bGV0IGNvdmVyYWdlID0gMDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjbG91ZHMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgYyA9IGNsb3Vkc1tpXTtcblx0XHRpZiAoYy5iYXNlIDwgMTgwMCkge1xuXHRcdFx0Y292ZXJhZ2UgKz0gYy5jb3ZlcmFnZTtcblx0XHR9XG5cdH1cblx0aWYgKGNvdmVyYWdlID49IDIpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRydWU7XG4gIH1cbiAgXG4gIGlzSU1DKCkgOiBib29sZWFuIHtcbiAgXHRpZiAodGhpcy53eC52aXMubWluIDw9IDUwMDApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRsZXQgY2xvdWRzID0gdGhpcy53eC5jbG91ZDtcblx0bGV0IGNvdmVyYWdlID0gMDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjbG91ZHMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgYyA9IGNsb3Vkc1tpXTtcblx0XHRpZiAoYy5iYXNlIDwgMTgwMCkge1xuXHRcdFx0Y292ZXJhZ2UgKz0gYy5jb3ZlcmFnZTtcblx0XHR9XG5cdH1cblx0aWYgKGNvdmVyYWdlID49IDcpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjbG91ZEFzVGV4dCgpIDogc3RyaW5nIHtcbiAgXHRpZiAodGhpcy53eC5jbG91ZC5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gJ25pbCc7XG5cdH0gZWxzZSB7XG5cdFx0bGV0IHN0ID0gJyc7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnd4LmNsb3VkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgY2xvdWQ6IENsb3VkID0gdGhpcy53eC5jbG91ZFtpXTtcblx0XHRcdHN0ICs9ICcgJyArIHRoaXMub2t0YXNUb1N0cmluZyhjbG91ZC5jb3ZlcmFnZSkgKyAnICcgKyBjbG91ZC5iYXNlO1xuXHRcdH1cblx0XHRyZXR1cm4gc3Q7XG5cdH1cbiAgfVxuICBjbG91ZEFzU3RyaW5nKCkgOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLnd4LmNsb3VkLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiAnbmlsJztcblx0fSBlbHNlIHtcblx0XHRsZXQgc3QgPSAnJztcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud3guY2xvdWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBjbG91ZDogQ2xvdWQgPSB0aGlzLnd4LmNsb3VkW2ldO1xuXHRcdFx0c3QgKz0gJyAnICsgdGhpcy5va3Rhc1RvU3RyaW5nKGNsb3VkLmNvdmVyYWdlKSArICcgJyArIHRoaXMuc3ROdW1iZXIoY2xvdWQuYmFzZSk7XG5cdFx0fVxuXHRcdHJldHVybiBzdDtcblx0fVxuICB9XG5cbiAgd2VhdGhlckFzU3RyaW5nKCkgOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLnd4Lnd4Lmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiAnJztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdGhpcy53eC53eC5qb2luKCcsICcpO1xuXHR9XG4gIH1cblxuICAgcHVibGljIHRvTnVtYmVycyhuOiBudW1iZXIpIDogc3RyaW5nIHtcbiAgIFx0bGV0IG1hcCA9IHtcblx0XHQnMCc6ICd6ZXJvJyxcblx0XHQnMSc6ICd3dW4nLFxuXHRcdCcyJzogJ3R3bycsXG5cdFx0JzMnOiAndGhyZWUnLFxuXHRcdCc0JzogJ2ZvcmUnLFxuXHRcdCc1JzogJ2ZpZmUnLFxuXHRcdCc2JzogJ3NpeCcsXG5cdFx0JzcnOiAnc2VmZmVuJyxcblx0XHQnOCc6ICdlaWdodCcsXG5cdFx0JzknOiAnbmluZXInLFxuXHRcdH07XG4gICBcdGxldCBuc3QgPSBuLnRvU3RyaW5nKCk7XG5cdGxldCBkID0gbnN0LnNwbGl0KCcnKTtcblx0bGV0IHJlc3BvbnNlOiBzdHJpbmdbXSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGQubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgZHN0ID0gZFtpXTtcblx0XHRsZXQgZFBob24gPSBtYXBbZHN0XTtcblx0XHRpZiAoZFBob24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVzcG9uc2UucHVzaChkUGhvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRyZXNwb25zZS5wdXNoKGRzdCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXNwb25zZS5qb2luKCcgJyk7XG4gICB9XG5cblxufVxuIl19