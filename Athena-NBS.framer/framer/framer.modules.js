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

Listener = (function(superClass) {
  extend(Listener, superClass);

  function Listener(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: 'transparent',
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primary,
      width: exports.situationWidth,
      height: 50
    });
    Listener.__super__.constructor.call(this, this.options);
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
      x: 0
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
      height: 0,
      opacity: 0
    };
  }

  return Container;

})(Layer);

exports.Situation = (function(superClass) {
  extend(Situation, superClass);

  function Situation(options) {
    var bricks, i, j;
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
    for (i = j = 0; j < 4; i = ++j) {
      bricks.push(new Brick({
        y: i * 100,
        parent: this.container,
        title: "Brick " + i
      }));
    }
    bricks.push(new Brick({
      y: i * 100,
      parent: this.container,
      title: "+ Add new brick"
    }));
    this.listener = new Listener({
      parent: this
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmNsYXNzIExpc3RlbmVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0aGVpZ2h0OiA1MFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuY2xhc3MgQnJpY2sgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjQ0NDXCJcblx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0eDogMFxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogQG9wdGlvbnMudGl0bGVcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Y29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cblxuXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2VcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRALnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdG9wYWNpdHk6IDBcblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLlNpdHVhdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBcIkV2ZW50IE5hbWVcIlxuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR4OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHRoZWlnaHQ6IDMqZXhwb3J0cy5wYWRkaW5nICsgZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHRib3JkZXJSYWRpdXM6IGV4cG9ydHMuYm9yZGVycmFkaXVzXG5cdFx0XHR4OiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMipleHBvcnRzLnBhZGRpbmdcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAbGFiZWwucGFyZW50ID0gQFxuXG5cdFx0QGNvbnRhaW5lciA9IG5ldyBDb250YWluZXJcblx0XHRcdHBhcmVudDogQFxuXG5cdFx0YnJpY2tzID0gW11cblx0XHRmb3IgaSBpbiBbMC4uLjRdXG5cdFx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdFx0eTogaSoxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udGFpbmVyXG5cdFx0XHRcdHRpdGxlOiBcIkJyaWNrIFwiICsgaVxuXHRcdGJyaWNrcy5wdXNoIG5ldyBCcmlja1xuXHRcdFx0eTogaSoxMDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcblxuXHRcdEBsaXN0ZW5lciA9IG5ldyBMaXN0ZW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAdHJpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDpleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRAdHJpLnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRyb3RhdGlvbjogLTkwXG5cblx0XHRAdHJpLm9uQ2xpY2sgQFRvZ2dsZVxuXG5cdFRvZ2dsZTogPT5cblx0XHRAY29udGFpbmVyLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblx0XHRAdHJpLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEQUEsSUFBQSwwQkFBQTtFQUFBOzs7O0FBQUEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCOztBQUN6QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFFdkIsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxZQUFSLEdBQXVCOztBQUN2QixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFFZDs7O0VBQ1Esa0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FB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
