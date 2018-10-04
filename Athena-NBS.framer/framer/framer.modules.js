require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.padding = 15;

exports.situationWidth = 300;

exports.Brick = (function(superClass) {
  extend(Brick, superClass);

  function Brick(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: "#CCC",
      height: 100,
      width: exports.situationWidth,
      x: 0,
      y: 3 * exports.padding
    });
    this.label = new TextLayer({
      fontSize: 12,
      color: "black",
      x: exports.padding,
      y: exports.padding
    });
    Brick.__super__.constructor.call(this, this.options);
    this.label.parent = this;
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
      results.push(this.children[i].animate({
        y: 2 * exports.padding,
        height: 0,
        opacity: 0,
        options: {
          time: 0.2,
          curve: Bezier.ease
        }
      }));
    }
    return results;
  };

  return Situation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuXG5jbGFzcyBleHBvcnRzLkJyaWNrIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI0NDQ1wiXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdHg6IDBcblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGNvbG9yOiBcImJsYWNrXCJcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsLnBhcmVudCA9IEBcblxuY2xhc3MgZXhwb3J0cy5TaXR1YXRpb24gZXh0ZW5kcyBMYXllclxuXHQgY29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdCBAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHRleHQ6IFwiRXZlbnQgTmFtZVwiXG5cdFx0XHRcdGZvbnRTaXplOiAxNlxuXHRcdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cdFx0IF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJibHVlXCJcblx0XHRcdFx0aGVpZ2h0OiA0KmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IDRcblx0XHRcdFx0eDogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdCBzdXBlciBAb3B0aW9uc1xuXG5cdFx0IEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHQgQC5vbkNsaWNrIEBUb2dnbGVcblxuXHQgVG9nZ2xlOiA9PlxuXHRcdFx0Zm9yIGkgaW4gWzEuLi5ALmNoaWxkcmVuLmxlbmd0aF1cblx0XHRcdFx0QC5jaGlsZHJlbltpXS5hbmltYXRlXG5cdFx0XHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdFx0XHRoZWlnaHQ6IDBcblx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUE7Ozs7QUFBQSxPQUFPLENBQUMsT0FBUixHQUFrQjs7QUFDbEIsT0FBTyxDQUFDLGNBQVIsR0FBeUI7O0FBRW5CLE9BQU8sQ0FBQzs7O0VBQ0EsZUFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixNQUFqQjtNQUNBLE1BQUEsRUFBUSxHQURSO01BRUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxjQUZmO01BR0EsQ0FBQSxFQUFHLENBSEg7TUFJQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUpiO0tBREQ7SUFPQSxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsU0FBQSxDQUNaO01BQUEsUUFBQSxFQUFVLEVBQVY7TUFDQSxLQUFBLEVBQU8sT0FEUDtNQUVBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FGWDtNQUdBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FIWDtLQURZO0lBTWIsdUNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0I7RUFqQko7Ozs7R0FEYzs7QUFvQnRCLE9BQU8sQ0FBQzs7O0VBQ0MsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztJQUV0QixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsU0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLFlBQU47TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLEtBQUEsRUFBTyxPQUZQO01BR0EsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUhYO01BSUEsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUpYO0tBRFk7SUFRYixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE1BQWpCO01BQ0EsTUFBQSxFQUFRLENBQUEsR0FBRSxPQUFPLENBQUMsT0FEbEI7TUFFQSxLQUFBLEVBQU8sT0FBTyxDQUFDLGNBRmY7TUFHQSxZQUFBLEVBQWMsQ0FIZDtNQUlBLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BSmI7TUFLQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUxiO0tBREQ7SUFRQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQjtJQUVoQixJQUFDLENBQUMsT0FBRixDQUFVLElBQUMsQ0FBQSxNQUFYO0VBdEJZOztzQkF3QmIsTUFBQSxHQUFRLFNBQUE7QUFDUCxRQUFBO0FBQUE7U0FBUyw2RkFBVDttQkFDQyxJQUFDLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQWQsQ0FDQztRQUFBLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BQWI7UUFDQSxNQUFBLEVBQVEsQ0FEUjtRQUVBLE9BQUEsRUFBUyxDQUZUO1FBR0EsT0FBQSxFQUNDO1VBQUEsSUFBQSxFQUFNLEdBQU47VUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLElBRGQ7U0FKRDtPQUREO0FBREQ7O0VBRE87Ozs7R0F6QnNCIn0=
