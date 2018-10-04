require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];

exports.Situation = (function(superClass) {
  extend(Situation, superClass);

  function Situation(options) {
    this.options = options != null ? options : {};
    this.label = new TextLayer({
      color: "white"
    });
    _.defaults(this.options, {
      backgroundColor: "blue",
      height: 48,
      borderRadius: 4
    });
    Situation.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.label.center();
  }

  return Situation;

})(Layer);

exports.Brick = (function(superClass) {
  extend(Brick, superClass);

  function Brick(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: "#000",
      height: 48,
      borderRadius: 4
    });
    Brick.__super__.constructor.call(this, this.options);
  }

  return Brick;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uXG4jIG5icyA9IHJlcXVpcmUgXCJuYnNcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbmJzLm15RnVuY3Rpb24oKSBvciBuYnMubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0IGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cbiAgICAgQGxhYmVsID0gbmV3IFRleHRMYXllclxuICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiXG5cbiAgICAgXy5kZWZhdWx0cyBAb3B0aW9ucyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yIDogXCJibHVlXCJcbiAgICAgICAgaGVpZ2h0OiA0OFxuICAgICAgICBib3JkZXJSYWRpdXM6IDRcblxuICAgICBzdXBlciBAb3B0aW9uc1xuXG4gICAgIEBsYWJlbC5wYXJlbnQgPSBAXG4gICAgIEBsYWJlbC5jZW50ZXIoKVxuXG5jbGFzcyBleHBvcnRzLkJyaWNrIGV4dGVuZHMgTGF5ZXJcbiAgIGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG4gICAgICBfLmRlZmF1bHRzIEBvcHRpb25zLFxuICAgICAgICAgYmFja2dyb3VuZENvbG9yIDogXCIjMDAwXCJcbiAgICAgICAgIGhlaWdodDogNDhcbiAgICAgICAgIGJvcmRlclJhZGl1cyA6IDRcbiAgICAgIHN1cGVyIEBvcHRpb25zXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBRElBLElBQUE7OztBQUFBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7O0FBRVosT0FBTyxDQUFDOzs7RUFDQyxtQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFcEIsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLFNBQUEsQ0FDVjtNQUFBLEtBQUEsRUFBTyxPQUFQO0tBRFU7SUFHYixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0c7TUFBQSxlQUFBLEVBQWtCLE1BQWxCO01BQ0EsTUFBQSxFQUFRLEVBRFI7TUFFQSxZQUFBLEVBQWMsQ0FGZDtLQURIO0lBS0EsMkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0I7SUFDaEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLENBQUE7RUFiVTs7OztHQURpQjs7QUFnQjFCLE9BQU8sQ0FBQzs7O0VBQ0UsZUFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFDcEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNHO01BQUEsZUFBQSxFQUFrQixNQUFsQjtNQUNBLE1BQUEsRUFBUSxFQURSO01BRUEsWUFBQSxFQUFlLENBRmY7S0FESDtJQUlBLHVDQUFNLElBQUMsQ0FBQSxPQUFQO0VBTFU7Ozs7R0FEWSJ9
