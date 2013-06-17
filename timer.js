var Timer = function(params) {

	var self = this;
	this.id = params.id;
	this.limit = params.limit * 1000;
	var timeout = typeof params.timeout === 'undefined' ? 1000 : params.timeout;
	var pauseMode = typeof params.pauseMode === 'undefined' ? false : params.pauseMode;
	var passed = 0;
	var compact = typeof params.compact === 'undefined' ? false : params.compact;	
	var hidden = typeof params.hidden === 'undefined' ? false : params.hidden;	
	
	var done = params.done;
	var pause = params.pause;
	var resume = params.resume;
	var reset = params.reset;
	
	var run = function() {
		if (hidden)
			document.getElementById(self.id).setAttribute('style', 'display: none;');
		document.getElementById(self.id).innerHTML = timeToStr(self.limit);
		setTimeout(draw, timeout);
	}
	
	var reduceTime = function() {
		if (!pauseMode)
			passed += timeout;
		return self.left();          
	}
	
	var timeToStr = function(miliseconds) {
		if (miliseconds >= 0) {
			var _s = Math.round(miliseconds / 1000);
			var h = Math.floor(_s / 3600);
			var m = Math.floor((_s % 3600) / 60);
			var s = _s % 60;
			return formatTime({
				h: h,
				m: m,
				s: s
			});
		} else {
			return false;
		}
	}
	
	var formatTime = function(timeObj) {
		if (compact)
			return (timeObj.m < 10 ? '0' + timeObj.m : timeObj.m) +
					':' +
					(timeObj.s < 10 ? '0' + timeObj.s : timeObj.s);
		else
			return (timeObj.h < 10 ? '0' + timeObj.h : timeObj.h) +
					':' +
					(timeObj.m < 10 ? '0' + timeObj.m : timeObj.m) +
					':' +
					(timeObj.s < 10 ? '0' + timeObj.s : timeObj.s);
	}
	
	var draw = function() {
		var res = timeToStr(reduceTime());
		if (!res) {
			done();
		} else {
			document.getElementById(self.id).innerHTML = res;
			setTimeout(draw, timeout);
		}
	}
	
	this.left = function() {
		return self.limit - passed;
	}
	this.passed = function() {
		return passed;
	}
	
	this.pause = function() {
		pauseMode = true;
		pause();
		return this;
	}
	
	this.resume = function() {
		pauseMode = false;
		resume();
		return this;
	}
	
	this.reset = function() {
		document.getElementById(self.id).innerHTML = timeToStr(self.limit);
		passed = 0;
		reset();
		return this;
	}
	
	run();
	
}
