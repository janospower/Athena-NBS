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

exports.NodeLines = (function(superClass) {
  extend(NodeLines, superClass);

  function NodeLines(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: null,
      width: 2 * exports.padding,
      y: 0,
      html: '<svg> <path d="M0 ' + ("" + this.options.yy) + ' C 20 ' + ("" + this.options.yy) + ' 25 ' + ("" + 55) + ' 45 ' + ("" + 55) + '" stroke="#CC0026" stroke-width="2" fill="none" /> </svg>'
    });
    NodeLines.__super__.constructor.call(this, this.options);
  }

  return NodeLines;

})(Layer);

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
    var bricks, child, i, j, k, len, len1, ref, ref1;
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
    this.nodeLinks = [];
    ref1 = exports.listeners;
    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
      child = ref1[i];
      this.nodeLinks.push(new exports.NodeLines({
        x: this.x + this.width,
        yy: child.screenFrame.y + child.height / 2
      }));
    }
    this.tri.onClick(this.Toggle);
    this.onDrag(this.UpdateLinks);
  }

  Situation.prototype.Toggle = function() {
    this.container.stateCycle("collapsed", "default");
    return this.tri.stateCycle("collapsed", "default");
  };

  Situation.prototype.UpdateLinks = function() {
    var child, i, j, len, ref, results;
    ref = exports.listeners;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      results.push(nodeLinks.push(new exports.NodeLines({
        x: child.screenFrame.x + child.width,
        yy: child.screenFrame.y + child.height / 2
      })));
    }
    return results;
  };

  return Situation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlMaWdodCA9IFwiIzRENjM3N1wiXG5leHBvcnRzLnNlY29uZGFyeSA9IFwiI0NDMDAyNlwiXG5cbmV4cG9ydHMubGlzdGVuZXJzID0gW11cblxuY2xhc3MgZXhwb3J0cy5Ob2RlTGluZXMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAwXG5cdFx0XHRodG1sOiAnXG5cdFx0XHQ8c3ZnPlxuXHRcdFx0ICA8cGF0aCBkPVwiTTAgJysgXCIje0BvcHRpb25zLnl5fVwiICsnIEMgMjAgJysgXCIje0BvcHRpb25zLnl5fVwiICsnIDI1ICcrIFwiI3s1NX1cIiArJyA0NSAnKyBcIiN7NTV9XCIgKydcIiBzdHJva2U9XCIjQ0MwMDI2XCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGZpbGw9XCJub25lXCIgLz5cblx0XHRcdDwvc3ZnPlxuXHRcdFx0J1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXG5cbmNsYXNzIExpc3RlbmVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5XG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aCAtIDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRoZWlnaHQ6IDQwXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBcIkV2ZW50IExpc3RlbmVyXCJcblx0XHRcdGZvbnRTaXplOiAxMlxuXHRcdFx0Y29sb3I6IFwiYmxhY2tcIlxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5jbGFzcyBCcmljayBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNDQ0NcIlxuXHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdHdpZHRoOiBleHBvcnRzLnNpdHVhdGlvbldpZHRoXG5cdFx0XHR4OiAwXG5cdFx0XHRib3JkZXJXaWR0aDogMVxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMuc2Vjb25kYXJ5XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRjb2xvcjogXCJibGFja1wiXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblxuXG5cblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6MC4yXG5cdFx0XHRcdGN1cnZlOiBCZXppZXIuZWFzZVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEAuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuU2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiRXZlbnQgTmFtZVwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRicmlja3MgPSBbXVxuXHRcdGZvciBjaGlsZCwgaSBpbiBAb3B0aW9ucy5ub2Rlc1xuXHRcdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHRcdHk6IGkqMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0XHR0aXRsZTogY2hpbGRcblx0XHRicmlja3MucHVzaCBuZXcgQnJpY2tcblx0XHRcdHk6IGkqMTAwXG5cdFx0XHRwYXJlbnQ6IEBjb250YWluZXJcblx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG5cblx0XHRleHBvcnRzLmxpc3RlbmVycy5wdXNoIG5ldyBMaXN0ZW5lclxuXHRcdFx0cGFyZW50OiBicmlja3NbaS0xXVxuXHRcdFx0bmFtZTogXCJMaXN0ZW5lclwiXG5cblx0XHRAdHJpID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyMFxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0eDpleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0c3R5bGU6XG5cdFx0XHRcdFwiYmFja2dyb3VuZFwiIDogXCJ1cmwoaW1hZ2VzL3RyaS5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cblx0XHRAdHJpLnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHRyb3RhdGlvbjogLTkwXG5cblx0XHRAbm9kZUxpbmtzID0gW11cblx0XHRmb3IgY2hpbGQsIGkgaW4gZXhwb3J0cy5saXN0ZW5lcnNcblx0XHRcdEBub2RlTGlua3MucHVzaCBuZXcgZXhwb3J0cy5Ob2RlTGluZXNcblx0XHRcdFx0eDogQC54ICsgQC53aWR0aFxuXHRcdFx0XHR5eTogY2hpbGQuc2NyZWVuRnJhbWUueSArIGNoaWxkLmhlaWdodC8yXG5cblx0XHRAdHJpLm9uQ2xpY2sgQFRvZ2dsZVxuXHRcdEAub25EcmFnIEBVcGRhdGVMaW5rc1xuXG5cdFRvZ2dsZTogPT5cblx0XHRAY29udGFpbmVyLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblx0XHRAdHJpLnN0YXRlQ3ljbGUgXCJjb2xsYXBzZWRcIiwgXCJkZWZhdWx0XCJcblxuXG5cdFVwZGF0ZUxpbmtzOiAtPlxuXHRcdGZvciBjaGlsZCwgaSBpbiBleHBvcnRzLmxpc3RlbmVyc1xuXHRcdFx0bm9kZUxpbmtzLnB1c2ggbmV3IGV4cG9ydHMuTm9kZUxpbmVzXG5cdFx0XHRcdHg6IGNoaWxkLnNjcmVlbkZyYW1lLnggKyBjaGlsZC53aWR0aFxuXHRcdFx0XHR5eTogY2hpbGQuc2NyZWVuRnJhbWUueSArIGNoaWxkLmhlaWdodC8yXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUEsMEJBQUE7RUFBQTs7OztBQUFBLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsY0FBUixHQUF5Qjs7QUFDekIsT0FBTyxDQUFDLFlBQVIsR0FBdUI7O0FBRXZCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCOztBQUNsQixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFDdkIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBRXBCLE9BQU8sQ0FBQyxTQUFSLEdBQW9COztBQUVkLE9BQU8sQ0FBQzs7O0VBQ0EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLGVBQUEsRUFBaUIsSUFBakI7TUFDQSxLQUFBLEVBQU8sQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQURqQjtNQUVBLENBQUEsRUFBRyxDQUZIO01BR0EsSUFBQSxFQUFNLG9CQUFBLEdBRVcsQ0FBQSxFQUFBLEdBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFaLENBRlgsR0FFNkIsUUFGN0IsR0FFdUMsQ0FBQSxFQUFBLEdBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFaLENBRnZDLEdBRXlELE1BRnpELEdBRWlFLENBQUEsRUFBQSxHQUFHLEVBQUgsQ0FGakUsR0FFMEUsTUFGMUUsR0FFa0YsQ0FBQSxFQUFBLEdBQUcsRUFBSCxDQUZsRixHQUUyRiwyREFMakc7S0FERDtJQVVBLDJDQUFNLElBQUMsQ0FBQSxPQUFQO0VBWlk7Ozs7R0FEa0I7O0FBaUIxQjs7O0VBQ1Esa0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLGVBQUEsRUFBaUIsYUFBakI7TUFDQSxZQUFBLEVBQWMsT0FBTyxDQUFDLFlBRHRCO01BRUEsV0FBQSxFQUFhLENBRmI7TUFHQSxXQUFBLEVBQWEsT0FBTyxDQUFDLE9BSHJCO01BSUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLENBQUEsR0FBRSxPQUFPLENBQUMsT0FKMUM7TUFLQSxNQUFBLEVBQVEsRUFMUjtNQU1BLENBQUEsRUFBRyxPQUFPLENBQUMsT0FOWDtNQU9BLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BUGI7S0FERDtJQVVBLDBDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLFNBQUEsQ0FDWjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQ0EsSUFBQSxFQUFNLGdCQUROO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFHQSxLQUFBLEVBQU8sT0FIUDtNQUlBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FKWDtNQUtBLENBQUEsRUFBRyxPQUFPLENBQUMsT0FMWDtLQURZO0VBZEQ7Ozs7R0FEUzs7QUF3QmpCOzs7RUFDUSxlQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE1BQWpCO01BQ0EsTUFBQSxFQUFRLEdBRFI7TUFFQSxLQUFBLEVBQU8sT0FBTyxDQUFDLGNBRmY7TUFHQSxDQUFBLEVBQUcsQ0FISDtNQUlBLFdBQUEsRUFBYSxDQUpiO01BS0EsV0FBQSxFQUFhLE9BQU8sQ0FBQyxTQUxyQjtLQUREO0lBUUEsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLFNBQUEsQ0FDWjtNQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsT0FBTyxDQUFDLEtBQWY7TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLEtBQUEsRUFBTyxPQUZQO01BR0EsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUhYO01BSUEsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUpYO0tBRFk7SUFPYix1Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQjtFQW5CSjs7OztHQURNOztBQTBCZDs7O0VBQ1EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLGVBQUEsRUFBaUIsYUFBakI7TUFDQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQURiO01BRUEsZ0JBQUEsRUFDQztRQUFBLElBQUEsRUFBSyxHQUFMO1FBQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxJQURkO09BSEQ7S0FERDtJQU9BLDJDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFDLE1BQU0sQ0FBQyxTQUFULEdBQ0M7TUFBQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUFiO01BQ0EsTUFBQSxFQUFRLENBRFI7TUFFQSxNQUFBLEVBQVEsQ0FGUjtNQUdBLE9BQUEsRUFBUyxDQUhUOztFQVpXOzs7O0dBRFU7O0FBc0JsQixPQUFPLENBQUM7OztFQUNBLG1CQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7O0lBRXRCLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxTQUFBLENBQ1o7TUFBQSxJQUFBLEVBQU0sWUFBTjtNQUNBLFFBQUEsRUFBVSxFQURWO01BRUEsS0FBQSxFQUFPLE9BRlA7TUFHQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUhiO01BSUEsQ0FBQSxFQUFHLE9BQU8sQ0FBQyxPQUpYO0tBRFk7SUFTYixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxlQUFBLEVBQWlCLE9BQU8sQ0FBQyxPQUF6QjtNQUNBLE1BQUEsRUFBUSxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BQVYsR0FBb0IsT0FBTyxDQUFDLFlBRHBDO01BRUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxjQUZmO01BR0EsWUFBQSxFQUFjLE9BQU8sQ0FBQyxZQUh0QjtNQUlBLENBQUEsRUFBRyxDQUFBLEdBQUUsT0FBTyxDQUFDLE9BSmI7TUFLQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLE9BQU8sQ0FBQyxPQUxiO0tBREQ7SUFRQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQjtJQUVoQixJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLFNBQUEsQ0FDaEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtLQURnQjtJQUdqQixNQUFBLEdBQVM7QUFDVDtBQUFBLFNBQUEsNkNBQUE7O01BQ0MsTUFBTSxDQUFDLElBQVAsQ0FBZ0IsSUFBQSxLQUFBLENBQ2Y7UUFBQSxDQUFBLEVBQUcsQ0FBQSxHQUFFLEdBQUw7UUFDQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBRFQ7UUFFQSxLQUFBLEVBQU8sS0FGUDtPQURlLENBQWhCO0FBREQ7SUFLQSxNQUFNLENBQUMsSUFBUCxDQUFnQixJQUFBLEtBQUEsQ0FDZjtNQUFBLENBQUEsRUFBRyxDQUFBLEdBQUUsR0FBTDtNQUNBLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FEVDtNQUVBLEtBQUEsRUFBTyxpQkFGUDtLQURlLENBQWhCO0lBS0EsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFsQixDQUEyQixJQUFBLFFBQUEsQ0FDMUI7TUFBQSxNQUFBLEVBQVEsTUFBTyxDQUFBLENBQUEsR0FBRSxDQUFGLENBQWY7TUFDQSxJQUFBLEVBQU0sVUFETjtLQUQwQixDQUEzQjtJQUlBLElBQUMsQ0FBQSxHQUFELEdBQVcsSUFBQSxLQUFBLENBQ1Y7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLEtBQUEsRUFBTyxFQURQO01BRUEsTUFBQSxFQUFRLEVBRlI7TUFHQSxDQUFBLEVBQUUsT0FBTyxDQUFDLE9BSFY7TUFJQSxDQUFBLEVBQUcsT0FBTyxDQUFDLE9BSlg7TUFLQSxLQUFBLEVBQ0M7UUFBQSxZQUFBLEVBQWUsaUNBQWY7UUFDQSxxQkFBQSxFQUFzQixhQUR0QjtRQUVBLGlCQUFBLEVBQW9CLFNBRnBCO09BTkQ7TUFTQSxnQkFBQSxFQUNDO1FBQUEsSUFBQSxFQUFLLEdBQUw7UUFDQSxLQUFBLEVBQU8sTUFBTSxDQUFDLElBRGQ7T0FWRDtLQURVO0lBY1gsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBWixHQUNDO01BQUEsUUFBQSxFQUFVLENBQUMsRUFBWDs7SUFFRCxJQUFDLENBQUEsU0FBRCxHQUFhO0FBQ2I7QUFBQSxTQUFBLGdEQUFBOztNQUNDLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFvQixJQUFBLE9BQU8sQ0FBQyxTQUFSLENBQ25CO1FBQUEsQ0FBQSxFQUFHLElBQUMsQ0FBQyxDQUFGLEdBQU0sSUFBQyxDQUFDLEtBQVg7UUFDQSxFQUFBLEVBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFsQixHQUFzQixLQUFLLENBQUMsTUFBTixHQUFhLENBRHZDO09BRG1CLENBQXBCO0FBREQ7SUFLQSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQUwsQ0FBYSxJQUFDLENBQUEsTUFBZDtJQUNBLElBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLFdBQVY7RUFqRVk7O3NCQW1FYixNQUFBLEdBQVEsU0FBQTtJQUNQLElBQUMsQ0FBQSxTQUFTLENBQUMsVUFBWCxDQUFzQixXQUF0QixFQUFtQyxTQUFuQztXQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBTCxDQUFnQixXQUFoQixFQUE2QixTQUE3QjtFQUZPOztzQkFLUixXQUFBLEdBQWEsU0FBQTtBQUNaLFFBQUE7QUFBQTtBQUFBO1NBQUEsNkNBQUE7O21CQUNDLFNBQVMsQ0FBQyxJQUFWLENBQW1CLElBQUEsT0FBTyxDQUFDLFNBQVIsQ0FDbEI7UUFBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFsQixHQUFzQixLQUFLLENBQUMsS0FBL0I7UUFDQSxFQUFBLEVBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFsQixHQUFzQixLQUFLLENBQUMsTUFBTixHQUFhLENBRHZDO09BRGtCLENBQW5CO0FBREQ7O0VBRFk7Ozs7R0F6RWtCIn0=
