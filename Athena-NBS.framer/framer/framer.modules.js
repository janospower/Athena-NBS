require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.padding = 15;

exports.situationWidth = 300;

exports.Wrapper = (function(superClass) {
  extend(Wrapper, superClass);

  function Wrapper(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: "transparent",
      x: 0,
      y: 3 * exports.padding,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    Wrapper.__super__.constructor.call(this, this.options);
    this.states.collapsed = {
      y: 2 * exports.padding,
      height: 0,
      opacity: 0
    };
  }

  return Wrapper;

})(Layer);

exports.Brick = (function(superClass) {
  extend(Brick, superClass);

  function Brick(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: "#CCC",
      height: 100,
      width: exports.situationWidth,
      x: 0,
      y: 3 * exports.padding,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    this.label = new TextLayer({
      fontSize: 12,
      color: "black",
      x: exports.padding,
      y: exports.padding
    });
    Brick.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.states.collapsed = {
      y: 2 * exports.padding,
      height: 0,
      opacity: 0
    };
  }

  return Brick;

})(Layer);

exports.Situation = (function(superClass) {
  extend(Situation, superClass);

  function Situation(options) {
    this.options = options != null ? options : {};
    this.Toggle = bind(this.Toggle, this);
    this.label = new TextLayer({
      text: "Event Name",
      fontSize: 16,
      color: "white",
      x: exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: "blue",
      height: 4 * exports.padding,
      width: exports.situationWidth,
      borderRadius: 4,
      x: 2 * exports.padding,
      y: 2 * exports.padding
    });
    Situation.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.onClick(this.Toggle);
  }

  Situation.prototype.Toggle = function() {
    var i, j, ref, results;
    results = [];
    for (i = j = 1, ref = this.children.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
      results.push(this.children[i].stateCycle("collapsed", "default"));
    }
    return results;
  };

  return Situation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuXG5jbGFzcyBleHBvcnRzLldyYXBwZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5jbGFzcyBleHBvcnRzLkJyaWNrIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI0NDQ1wiXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdHg6IDBcblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2VcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Y29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5jbGFzcyBleHBvcnRzLlNpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdCBjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0IEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0dGV4dDogXCJFdmVudCBOYW1lXCJcblx0XHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cblx0XHQgXy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImJsdWVcIlxuXHRcdFx0XHRoZWlnaHQ6IDQqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRcdGJvcmRlclJhZGl1czogNFxuXHRcdFx0XHR4OiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0IHN1cGVyIEBvcHRpb25zXG5cblx0XHQgQGxhYmVsLnBhcmVudCA9IEBcblxuXHRcdCBALm9uQ2xpY2sgQFRvZ2dsZVxuXG5cdCBUb2dnbGU6ID0+XG5cdFx0XHRmb3IgaSBpbiBbMS4uLkAuY2hpbGRyZW4ubGVuZ3RoXVxuXHRcdFx0XHRALmNoaWxkcmVuW2ldLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEQUEsSUFBQTs7OztBQUFBLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsY0FBUixHQUF5Qjs7QUFFbkIsT0FBTyxDQUFDOzs7RUFDQSxpQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixhQUFqQjtNQUNBLENBQUEsRUFBRyxDQURIO01BRUEsQ0FBQSxFQUFHLENBQUEsR0FBRSxPQUFPLENBQUMsT0FGYjtNQUdBLGdCQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQUssR0FBTDtRQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsSUFEZDtPQUpEO0tBREQ7SUFRQSx5Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQyxNQUFNLENBQUMsU0FBVCxHQUNDO01BQUEsQ0FBQSxFQUFHLENBQUEsR0FBRSxPQUFPLENBQUMsT0FBYjtNQUNBLE1BQUEsRUFBUSxDQURSO01BRUEsT0FBQSxFQUFTLENBRlQ7O0VBYlc7Ozs7R0FEZ0I7O0FBa0J4QixPQUFPLENBQUM7OztFQUNBLGVBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLGVBQUEsRUFBaUIsTUFBakI7TUFDQSxNQUFBLEVBQVEsR0FEUjtNQUVBLEtBQUEsRUFBTyxPQUFPLENBQUMsY0FGZjtNQUdBLENBQUEsRUFBRyxDQUhIO01BSUEsQ0FBQSxFQUFHLENBQUEsR0FBRSxPQUFPLENBQUMsT0FKYjtNQUtBLGdCQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQUssR0FBTDtRQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsSUFEZDtPQU5EO0tBREQ7SUFVQSxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsU0FBQSxDQUNaO01BQUEsUUFBQSxFQUFVLEVBQVY7TUFDQSxLQUFBLEVBQU8sT0FEUDtNQUVBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FGWDtNQUdBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FIWDtLQURZO0lBTWIsdUNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0I7SUFFaEIsSUFBQyxDQUFDLE1BQU0sQ0FBQyxTQUFULEdBQ0M7TUFBQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUFiO01BQ0EsTUFBQSxFQUFRLENBRFI7TUFFQSxPQUFBLEVBQVMsQ0FGVDs7RUF2Qlc7Ozs7R0FEYzs7QUE0QnRCLE9BQU8sQ0FBQzs7O0VBQ0MsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztJQUV0QixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsU0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLFlBQU47TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLEtBQUEsRUFBTyxPQUZQO01BR0EsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUhYO01BSUEsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUpYO0tBRFk7SUFRYixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE1BQWpCO01BQ0EsTUFBQSxFQUFRLENBQUEsR0FBRSxPQUFPLENBQUMsT0FEbEI7TUFFQSxLQUFBLEVBQU8sT0FBTyxDQUFDLGNBRmY7TUFHQSxZQUFBLEVBQWMsQ0FIZDtNQUlBLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BSmI7TUFLQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUxiO0tBREQ7SUFRQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQjtJQUVoQixJQUFDLENBQUMsT0FBRixDQUFVLElBQUMsQ0FBQSxNQUFYO0VBdEJZOztzQkF3QmIsTUFBQSxHQUFRLFNBQUE7QUFDUCxRQUFBO0FBQUE7U0FBUyw2RkFBVDttQkFDQyxJQUFDLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLFVBQWQsQ0FBeUIsV0FBekIsRUFBc0MsU0FBdEM7QUFERDs7RUFETzs7OztHQXpCc0IifQ==
