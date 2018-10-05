require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var Brick, Container, Listener,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.padding = 15;

exports.situationWidth = 300;

exports.borderradius = 4;

exports.primary = "#00203D";

exports.primaryLight = "#4D6377";

exports.secondary = "#CC0026";

exports.listeners = [];

Listener = (function(superClass) {
  extend(Listener, superClass);

  function Listener(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: 'transparent',
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primary,
      width: exports.situationWidth - 2 * exports.padding,
      height: 40,
      x: exports.padding,
      y: 3 * exports.padding
    });
    Listener.__super__.constructor.call(this, this.options);
    this.label = new TextLayer({
      parent: this,
      text: "Event Listener",
      fontSize: 12,
      color: "black",
      x: exports.padding,
      y: exports.padding
    });
  }

  return Listener;

})(Layer);

Brick = (function(superClass) {
  extend(Brick, superClass);

  function Brick(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: "#CCC",
      height: 100,
      width: exports.situationWidth,
      x: 0,
      borderWidth: 1,
      borderColor: exports.secondary
    });
    this.label = new TextLayer({
      text: this.options.title,
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

Container = (function(superClass) {
  extend(Container, superClass);

  function Container(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: "transparent",
      y: 3 * exports.padding,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    Container.__super__.constructor.call(this, this.options);
    this.states.collapsed = {
      y: 3 * exports.padding,
      scaleY: 0,
      height: 0,
      opacity: 0
    };
  }

  return Container;

})(Layer);

exports.Situation = (function(superClass) {
  extend(Situation, superClass);

  function Situation(options) {
    var bricks, child, i, j, len, ref;
    this.options = options != null ? options : {};
    this.Toggle = bind(this.Toggle, this);
    this.label = new TextLayer({
      text: "Event Name",
      fontSize: 16,
      color: "white",
      x: 3 * exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 3 * exports.padding + exports.borderradius,
      width: exports.situationWidth,
      borderRadius: exports.borderradius,
      x: 2 * exports.padding,
      y: 2 * exports.padding
    });
    Situation.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.container = new Container({
      parent: this
    });
    bricks = [];
    ref = this.options.nodes;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      bricks.push(new Brick({
        y: i * 100,
        parent: this.container,
        title: child
      }));
    }
    bricks.push(new Brick({
      y: i * 100,
      parent: this.container,
      title: "+ Add new brick"
    }));
    exports.listeners.push(new Listener({
      parent: bricks[i - 1],
      name: "Listener"
    }));
    this.tri = new Layer({
      parent: this,
      width: 20,
      height: 20,
      x: exports.padding,
      y: exports.padding,
      style: {
        "background": "url(images/tri.svg)   no-repeat",
        "background-position": "left center",
        "background-size": "contain"
      },
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    this.tri.states.collapsed = {
      rotation: -90
    };
    this.tri.onClick(this.Toggle);
  }

  Situation.prototype.Toggle = function() {
    this.container.stateCycle("collapsed", "default");
    return this.tri.stateCycle("collapsed", "default");
  };

  return Situation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmV4cG9ydHMubGlzdGVuZXJzID0gW11cblxuY2xhc3MgTGlzdGVuZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoIC0gMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdGhlaWdodDogNDBcblx0XHRcdHg6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IFwiRXZlbnQgTGlzdGVuZXJcIlxuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRjb2xvcjogXCJibGFja1wiXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5jbGFzcyBCcmljayBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNDQ0NcIlxuXHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHR4OiAwXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMuc2Vjb25kYXJ5XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRjb2xvcjogXCJibGFja1wiXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblxuXG5cblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiRXZlbnQgTmFtZVwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRicmlja3MgPSBbXVxuXHRcdGZvciBjaGlsZCwgaSBpbiBAb3B0aW9ucy5ub2Rlc1xuXHRcdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHRcdHk6IGkqMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0XHR0aXRsZTogY2hpbGRcblx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdHk6IGkqMTAwXG5cdFx0XHRwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG5cblx0XHRleHBvcnRzLmxpc3RlbmVycy5wdXNoIG5ldyBMaXN0ZW5lclxuXHRcdFx0cGFyZW50OiBicmlja3NbaS0xXVxuXHRcdFx0bmFtZTogXCJMaXN0ZW5lclwiXG5cblx0XHRAdHJpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDpleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRAdHJpLnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRyb3RhdGlvbjogLTkwXG5cblx0XHRAdHJpLm9uQ2xpY2sgQFRvZ2dsZVxuXG5cdFRvZ2dsZTogPT5cblx0XHRAY29udGFpbmVyLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblx0XHRAdHJpLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEQUEsSUFBQSwwQkFBQTtFQUFBOzs7O0FBQUEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCOztBQUN6QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFFdkIsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCOztBQUN2QixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFFcEIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBRWQ7OztFQUNRLGtCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLGFBQWpCO01BQ0EsWUFBQSxFQUFjLE9BQU8sQ0FBQyxZQUR0QjtNQUVBLFdBQUEsRUFBYSxDQUZiO01BR0EsV0FBQSxFQUFhLE9BQU8sQ0FBQyxPQUhyQjtNQUlBLEtBQUEsRUFBTyxPQUFPLENBQUMsY0FBUixHQUF5QixDQUFBLEdBQUUsT0FBTyxDQUFDLE9BSjFDO01BS0EsTUFBQSxFQUFRLEVBTFI7TUFNQSxDQUFBLEVBQUcsT0FBTyxDQUFDLE9BTlg7TUFPQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQVBiO0tBREQ7SUFVQSwwQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxTQUFBLENBQ1o7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLElBQUEsRUFBTSxnQkFETjtNQUVBLFFBQUEsRUFBVSxFQUZWO01BR0EsS0FBQSxFQUFPLE9BSFA7TUFJQSxDQUFBLEVBQUcsT0FBTyxDQUFDLE9BSlg7TUFLQSxDQUFBLEVBQUcsT0FBTyxDQUFDLE9BTFg7S0FEWTtFQWREOzs7O0dBRFM7O0FBdUJqQjs7O0VBQ1EsZUFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixNQUFqQjtNQUNBLE1BQUEsRUFBUSxHQURSO01BRUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxjQUZmO01BR0EsQ0FBQSxFQUFHLENBSEg7TUFJQSxXQUFBLEVBQWEsQ0FKYjtNQUtBLFdBQUEsRUFBYSxPQUFPLENBQUMsU0FMckI7S0FERDtJQVFBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxTQUFBLENBQ1o7TUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFmO01BQ0EsUUFBQSxFQUFVLEVBRFY7TUFFQSxLQUFBLEVBQU8sT0FGUDtNQUdBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FIWDtNQUlBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FKWDtLQURZO0lBT2IsdUNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0I7RUFuQko7Ozs7R0FETTs7QUEwQmQ7OztFQUNRLG1CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLGFBQWpCO01BQ0EsQ0FBQSxFQUFHLENBQUEsR0FBRSxPQUFPLENBQUMsT0FEYjtNQUVBLGdCQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQUssR0FBTDtRQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsSUFEZDtPQUhEO0tBREQ7SUFPQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQyxNQUFNLENBQUMsU0FBVCxHQUNDO01BQUEsQ0FBQSxFQUFHLENBQUEsR0FBRSxPQUFPLENBQUMsT0FBYjtNQUNBLE1BQUEsRUFBUSxDQURSO01BRUEsTUFBQSxFQUFRLENBRlI7TUFHQSxPQUFBLEVBQVMsQ0FIVDs7RUFaVzs7OztHQURVOztBQXNCbEIsT0FBTyxDQUFDOzs7RUFDQSxtQkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztJQUV0QixJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsU0FBQSxDQUNaO01BQUEsSUFBQSxFQUFNLFlBQU47TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLEtBQUEsRUFBTyxPQUZQO01BR0EsQ0FBQSxFQUFHLENBQUEsR0FBRSxPQUFPLENBQUMsT0FIYjtNQUlBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FKWDtLQURZO0lBU2IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixPQUFPLENBQUMsT0FBekI7TUFDQSxNQUFBLEVBQVEsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUFWLEdBQW9CLE9BQU8sQ0FBQyxZQURwQztNQUVBLEtBQUEsRUFBTyxPQUFPLENBQUMsY0FGZjtNQUdBLFlBQUEsRUFBYyxPQUFPLENBQUMsWUFIdEI7TUFJQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUpiO01BS0EsQ0FBQSxFQUFHLENBQUEsR0FBRSxPQUFPLENBQUMsT0FMYjtLQUREO0lBUUEsMkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0I7SUFFaEIsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxTQUFBLENBQ2hCO01BQUEsTUFBQSxFQUFRLElBQVI7S0FEZ0I7SUFHakIsTUFBQSxHQUFTO0FBQ1Q7QUFBQSxTQUFBLDZDQUFBOztNQUNDLE1BQU0sQ0FBQyxJQUFQLENBQWdCLElBQUEsS0FBQSxDQUNmO1FBQUEsQ0FBQSxFQUFHLENBQUEsR0FBRSxHQUFMO1FBQ0EsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQURUO1FBRUEsS0FBQSxFQUFPLEtBRlA7T0FEZSxDQUFoQjtBQUREO0lBS0EsTUFBTSxDQUFDLElBQVAsQ0FBZ0IsSUFBQSxLQUFBLENBQ2Y7TUFBQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLEdBQUw7TUFDQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBRFQ7TUFFQSxLQUFBLEVBQU8saUJBRlA7S0FEZSxDQUFoQjtJQUtBLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBbEIsQ0FBMkIsSUFBQSxRQUFBLENBQzFCO01BQUEsTUFBQSxFQUFRLE1BQU8sQ0FBQSxDQUFBLEdBQUUsQ0FBRixDQUFmO01BQ0EsSUFBQSxFQUFNLFVBRE47S0FEMEIsQ0FBM0I7SUFJQSxJQUFDLENBQUEsR0FBRCxHQUFXLElBQUEsS0FBQSxDQUNWO01BQUEsTUFBQSxFQUFRLElBQVI7TUFDQSxLQUFBLEVBQU8sRUFEUDtNQUVBLE1BQUEsRUFBUSxFQUZSO01BR0EsQ0FBQSxFQUFFLE9BQU8sQ0FBQyxPQUhWO01BSUEsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUpYO01BS0EsS0FBQSxFQUNDO1FBQUEsWUFBQSxFQUFlLGlDQUFmO1FBQ0EscUJBQUEsRUFBc0IsYUFEdEI7UUFFQSxpQkFBQSxFQUFvQixTQUZwQjtPQU5EO01BU0EsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBSyxHQUFMO1FBQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxJQURkO09BVkQ7S0FEVTtJQWNYLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVosR0FDQztNQUFBLFFBQUEsRUFBVSxDQUFDLEVBQVg7O0lBRUQsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWEsSUFBQyxDQUFBLE1BQWQ7RUExRFk7O3NCQTREYixNQUFBLEdBQVEsU0FBQTtJQUNQLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBWCxDQUFzQixXQUF0QixFQUFtQyxTQUFuQztXQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBTCxDQUFnQixXQUFoQixFQUE2QixTQUE3QjtFQUZPOzs7O0dBN0R1QiJ9
